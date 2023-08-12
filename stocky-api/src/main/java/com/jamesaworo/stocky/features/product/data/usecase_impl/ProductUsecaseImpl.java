package com.jamesaworo.stocky.features.product.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.core.constants.Setting;
import com.jamesaworo.stocky.core.constants.enums.Template;
import com.jamesaworo.stocky.core.utils.FileUtil;
import com.jamesaworo.stocky.features.product.data.repository.ProductRepository;
import com.jamesaworo.stocky.features.product.domain.entity.*;
import com.jamesaworo.stocky.features.product.domain.enums.ProductQuantityUpdateType;
import com.jamesaworo.stocky.features.product.domain.usecase.*;
import com.jamesaworo.stocky.features.settings.domain.entity.SettingStock;
import com.jamesaworo.stocky.features.settings.domain.usecase.ISettingUsecase;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

import static com.jamesaworo.stocky.core.constants.ReportConstant.*;
import static com.jamesaworo.stocky.core.utils.FileUtil.*;
import static com.jamesaworo.stocky.features.product.domain.enums.ProductQuantityUpdateType.DECREMENT;
import static com.jamesaworo.stocky.features.product.domain.enums.ProductQuantityUpdateType.INCREMENT;
import static java.lang.String.format;
import static java.util.Optional.empty;
import static java.util.Optional.of;
import static org.springframework.util.ObjectUtils.isEmpty;

/**
 * @author Aworo James
 * @since 5/10/23
 */
@Usecase
@RequiredArgsConstructor
public class ProductUsecaseImpl implements IProductUsecase {

    private final ProductRepository repository;
    private final IProductBasicUsecase basicUsecase;
    private final IProductPriceUsecase priceUsecase;
    private final ISettingUsecase<SettingStock> settingUsecase;
    private final IProductCategoryUsecase productCategoryUsecase;
    private final IProductUnitOfMeasureUsecase unitOfMeasureUsecase;
    private final IProductStatusUsecase productStatusUsecase;
    private final IProductTaxUsecase taxUsecase;
    private Map<String, String> scrapMap = new LinkedHashMap<>();
    private Integer successUploadCount = 0;
    private Integer failedUploadCount = 0;

    @Override
    public Optional<Product> findById(Long id) {
        return this.repository.findById(id);
    }

    @Override
    public Product save(Product product) {
        return this.repository.save(product);
    }

    @Override
    public Page<Product> findMany(Specification<Product> specification, Pageable pageable) {
        return this.repository.findAll(specification, pageable);
    }

    @Override
    public List<Product> findMany(Specification<Product> specification) {
        return this.repository.findAll(specification);
    }

    @Override
    public void updateProductQuantity(Product product, Integer quantity) {
        updateQuantity(product, quantity, INCREMENT);
    }

    @Override
    public void tryUpdateProductPrice(Product product, ProductPrice productPrice) {
        Optional<Product> optionalProduct = this.findById(product.getId());
        optionalProduct.map(existingProduct -> {
            ProductPrice existingProductPrice = existingProduct.getPrice();
            existingProductPrice.setCostPrice(productPrice.getCostPrice());
            existingProductPrice.setSellingPrice(productPrice.getSellingPrice());
            existingProductPrice.setMarkup(productPrice.getMarkup());

            ProductPrice saved = this.priceUsecase.save(existingProductPrice);
            return !isEmpty(saved);
        });
    }

    @Override
    public void deductProductQuantityAfterSales(Product product, Integer deductBy) {
        Optional<Product> optionalProduct = this.findById(product.getId());
        optionalProduct.ifPresent(exitingProduct -> {
            if (exitingProduct.getBasic().getQuantity() >= deductBy) {
                updateQuantity(exitingProduct, deductBy, DECREMENT);
            }
        });
    }

    private void updateQuantity(Product product, Integer quantity, ProductQuantityUpdateType productQuantityUpdateType) {
        Optional<SettingStock> optionalSetting = this.settingUsecase.get(Setting.SETTING_STOCK_ENABLE_STOCK);
        optionalSetting.ifPresent(setting -> {
            Optional<Product> optionalProduct = this.findById(product.getId());
            optionalProduct.ifPresent(existingProduct -> {
                ProductBasic basic = existingProduct.getBasic();
                this.basicUsecase.updateProductQuantity(basic.getId(), quantity, productQuantityUpdateType);
            });
        });
    }

    @Override
    public Resource downloadTemplate(Template template) {
        return FileUtil.findResource(template);
    }

    @Override
    public Map<String, String> uploadTemplate(MultipartFile file) {
        //FileHandlerStatus status = new FileHandlerStatus();

        try (Workbook workbook = openWorkbook(file.getInputStream())) {
            this.successUploadCount = 0;
            this.failedUploadCount = 0;
            this.scrapMap = validateWorkbook(workbook, Template.PRODUCT_UPLOAD, 1);

            Sheet sheet = getSheetAtPosition(workbook, 1);
            int physicalNumberOfRows = getNumberOfRowsWithoutHeader(sheet);

            for (int index = 0; index < physicalNumberOfRows; index++) {
                if (index == 0) continue;
                boolean saved = mapRowToProductAndSave(sheet.getRow(index), index);
                updateUploadCount(saved);
            }

            closeWorkbook(workbook);
            updateScrapSuccessAndFailedCount(physicalNumberOfRows);
            return this.scrapMap;

        } catch (Exception exception) {
            throw new RuntimeException(exception);
        }
    }

    private boolean mapRowToProductAndSave(Row row, int rowIndex) {
        if (isEmptyRow(row)) return false;

        Optional<ProductBasic> basic = mapRowToProductBasicModel(row, rowIndex);
        Optional<ProductPrice> price = mapRowToProductPriceModel(row, rowIndex);

        if (basic.isPresent() && price.isPresent()) {
            Product product = Product.builder().price(price.get()).basic(basic.get()).build();
            this.repository.save(product);
            return true;
        }
        return false;
    }

    private Optional<ProductBasic> mapRowToProductBasicModel(Row row, int rowIndex) {
        String category = row.getCell(0).getStringCellValue();
        String unitOfMeasure = row.getCell(1).getStringCellValue();
        String productStatus = row.getCell(2).getStringCellValue();
        String taxes = row.getCell(3).getStringCellValue();
        String productName = row.getCell(4).getStringCellValue();
        String sku = row.getCell(5).getStringCellValue();
        String barcode = row.getCell(6).getStringCellValue();
        String brandName = row.getCell(7).getStringCellValue();
        String description = row.getCell(8).getStringCellValue();
        String serviceOrProduct = row.getCell(9).getStringCellValue();
        double quantity = row.getCell(10).getNumericCellValue();

        ProductBasic basic = new ProductBasic();

        Boolean nameAndBrandExist = this.basicUsecase.isNameAndBrandExist(productName, brandName);
        if (nameAndBrandExist) return updateScrap(row, 4, "Product with the same name and brand already exists");

        // product category
        if (isEmpty(category)) return updateScrap(row, 0, CELL_EMPTY);
        Optional<ProductCategory> optionalCategory = this.productCategoryUsecase.findOne(category);
        if (optionalCategory.isEmpty()) return updateScrap(
                row, 0, "No product category with this name ( " + category + " ) exist");
        basic.setProductCategory(optionalCategory.get());

        // unit of measure
        if (isEmpty(unitOfMeasure)) return updateScrap(row, 1, CELL_EMPTY);
        Optional<ProductUnitOfMeasure> optionalMeasure = this.unitOfMeasureUsecase.findOne(unitOfMeasure);
        if (optionalMeasure.isEmpty()) return updateScrap(row, 1, category + DONT_EXIST);
        basic.setUnitOfMeasure(optionalMeasure.get());

        // product status
        if (isEmpty(productStatus)) return updateScrap(row, 2, CELL_EMPTY);
        Optional<ProductStatus> optionalProductStatus = this.productStatusUsecase.findOne(productStatus);
        if (optionalProductStatus.isEmpty()) return updateScrap(row, 2, productStatus + DONT_EXIST);
        basic.setStatus(optionalProductStatus.get());

        // tax
        if (isEmpty(taxes)) return updateScrap(row, 3, CELL_EMPTY);
        String[] taxesArr = cellValueToStringArray(taxes);
        if (taxesArr.length < 1) return updateScrap(row, 3, taxes + DONT_EXIST);
        List<ProductTax> productTaxes = new ArrayList<>();
        for (String taxName : taxesArr) {
            Optional<ProductTax> optionalTax = taxUsecase.findOne(taxName);
            if (optionalTax.isEmpty()) return updateScrap(row, 3, taxName + DONT_EXIST);
            productTaxes.add(optionalTax.get());
        }
        basic.setTaxes(productTaxes);

        // product name
        if (isEmpty(productName)) return updateScrap(row, 4, CELL_EMPTY);
        basic.setProductName(productName);

        // sku
        if (!isEmpty(sku)) basic.setSku(sku);

        // barcode
        if (!isEmpty(barcode)) basic.setBarcode(barcode);

        // brandName
        if (!isEmpty(brandName)) basic.setBrandName(brandName);

        // description
        if (!isEmpty(description)) basic.setDescription(description);

        // serviceOrProduct
        if (!isEmpty(serviceOrProduct)) {
            boolean isProduct = serviceOrProduct.equalsIgnoreCase("product");
            if (isProduct) {
                basic.setIsService(false);
                basic.setUseQuantity(true);
            } else {
                basic.setIsService(true);
                basic.setUseQuantity(false);
            }
        }

        // quantity
        basic.setQuantity(!isEmpty(quantity) ? cellDoubleValueToInt(quantity) : 0);
        return of(this.basicUsecase.save(basic));

    }

    private Optional<ProductPrice> mapRowToProductPriceModel(Row row, int rowIndex) {
        ProductPrice price = new ProductPrice();

        double markupPercent = row.getCell(11).getNumericCellValue();
        double costPrice = row.getCell(12).getNumericCellValue();
        double sellingPrice = row.getCell(13).getNumericCellValue();
        double discount = row.getCell(14).getNumericCellValue();

        price.setMarkup(!isEmpty(markupPercent) ? markupPercent : 0);
        price.setCostPrice(!isEmpty(costPrice) ? costPrice : 0);
        price.setSellingPrice(!isEmpty(sellingPrice) ? sellingPrice : 0);
        price.setDiscount(!isEmpty(discount) ? discount : 0);

        return of(this.priceUsecase.save(price));

    }

    private void updateUploadCount(boolean saved) {
        if (saved) {
            this.successUploadCount++;
        } else {
            this.failedUploadCount++;
        }
    }

    private void updateScrapSuccessAndFailedCount(int totalNumberOfRows) {
        this.scrapMap.put("Total number of record upload: ", String.valueOf(totalNumberOfRows));
        this.scrapMap.put("Total number successfully uploaded: ", String.valueOf(this.successUploadCount));
        this.scrapMap.put("Total number failed to upload: ", String.valueOf(this.failedUploadCount));
        this.scrapMap.put("-", "-");
    }

    private <T> Optional<T> updateScrap(Row row, int position, String message) {
        this.scrapMap.put(ERROR, format(CELL_ERROR, cellAddress(row, position), message));
        return empty();
    }

}