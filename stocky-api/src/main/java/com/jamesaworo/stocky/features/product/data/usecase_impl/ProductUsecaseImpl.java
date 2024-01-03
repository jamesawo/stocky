package com.jamesaworo.stocky.features.product.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.core.constants.Setting;
import com.jamesaworo.stocky.core.constants.enums.Template;
import com.jamesaworo.stocky.core.params.BiParam;
import com.jamesaworo.stocky.core.utils.FileUtil;
import com.jamesaworo.stocky.features.product.data.repository.ProductRepository;
import com.jamesaworo.stocky.features.product.data.request.mapper.ProductBasicRow;
import com.jamesaworo.stocky.features.product.data.request.mapper.ProductPriceRow;
import com.jamesaworo.stocky.features.product.domain.entity.*;
import com.jamesaworo.stocky.features.product.domain.enums.ProductQuantityUpdateType;
import com.jamesaworo.stocky.features.product.domain.usecase.*;
import com.jamesaworo.stocky.features.settings.domain.entity.SettingStock;
import com.jamesaworo.stocky.features.settings.domain.usecase.ISettingUsecase;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.*;

import static com.jamesaworo.stocky.core.constants.ReportConstant.*;
import static com.jamesaworo.stocky.core.utils.FileUtil.isEmptyRow;
import static com.jamesaworo.stocky.core.utils.FileUtil.uploadStatistics;
import static com.jamesaworo.stocky.features.product.domain.enums.ProductQuantityUpdateType.DECREMENT;
import static com.jamesaworo.stocky.features.product.domain.enums.ProductQuantityUpdateType.INCREMENT;
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
    private final ApplicationContext context;
    private final IProductCategoryUsecase productCategoryUsecase;
    private final IProductUnitOfMeasureUsecase unitOfMeasureUsecase;

    private Map<String, String> scrapMap = new LinkedHashMap<>();
    private Integer successUploadCount = 0;
    private Integer failedUploadCount = 0;
    private Integer totalRowsCount = 0;

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
            Integer quantity = exitingProduct.getBasic().getQuantity();
            if (!isEmpty(quantity) && quantity >= deductBy) {
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

 /*   @Override
    public Map<String, String> uploadTemplate(MultipartFile file) {
        // FileHandlerStatus status = new FileHandlerStatus();

        try (Workbook workbook = openWorkbook(file.getInputStream())) {

            this.scrapMap = validateWorkbook(workbook, Template.PRODUCT_UPLOAD, 1);
            Sheet sheet = getSheetAtPosition(workbook, 1);

            this.successUploadCount = 0;
            this.failedUploadCount = 0;
            this.totalRowsCount = numberOfRowsWithoutHeader(sheet);

            for (int index = 0; index < sheet.getPhysicalNumberOfRows(); index++) {
                // skip header
                if (index == 0) continue;
                boolean saved = mapRowToProductAndSave(sheet.getRow(index), index);
                updateUploadCount(saved);
            }

            closeWorkbook(workbook);
            updateTotalSummaryInScrapMap();
            return this.scrapMap;

        } catch (Exception exception) {
            System.out.println(exception.getLocalizedMessage());
            throw new RuntimeException(exception);
        }
    }*/

    private boolean mapRowToProductAndSave(Row row, int rowIndex) {
        if (isEmptyRow(row)) return false;

        Optional<ProductBasic> basic = mapRowToProductBasicModel(row, rowIndex);
        if (basic.isPresent()) {
            Optional<ProductPrice> price = mapRowToProductPriceModel(row, rowIndex);
            if (price.isPresent()) {
                Product product = Product.builder().price(price.get()).basic(basic.get()).build();
                this.repository.save(product);
                return true;
            }
        }
        return false;
    }

    private Optional<ProductBasic> mapRowToProductBasicModel(Row row, int rowIndex) {
        ProductBasicRow basicRow = new ProductBasicRow(row, context);
        BiParam<Boolean, Optional<ProductBasic>> param = basicRow.mapRowToProductBasicModel(this.scrapMap, rowIndex);
        return param.getRight();
    }

    private Optional<ProductPrice> mapRowToProductPriceModel(Row row, int rowIndex) {
        ProductPriceRow priceRow = new ProductPriceRow(row, context);
        BiParam<Boolean, Optional<ProductPrice>> param = priceRow.mapRowToProductPriceModel(this.scrapMap);
        return param.getRight();
    }

    private void updateUploadCount(boolean saved) {
        if (saved) {
            this.successUploadCount++;
        } else {
            this.failedUploadCount++;
        }
    }

    private void updateTotalSummaryInScrapMap() {
        this.scrapMap.put(TOTAL_COUNT, String.valueOf(this.totalRowsCount));
        this.scrapMap.put(SUCCESS_COUNT, String.valueOf(this.successUploadCount));
        this.scrapMap.put(FAILED_COUNT, String.valueOf(this.failedUploadCount));
        this.scrapMap.put(STATS_COUNT, uploadStatistics(this.totalRowsCount, this.successUploadCount, this.failedUploadCount));
    }


    /*
        Todo::clean up method block
    * */
    @Override
    public Map<String, String> uploadTemplate(MultipartFile file) {
        Map<String, String> result = new HashMap<>();

        try {
            // create a workbook
            XSSFWorkbook workbook = new XSSFWorkbook(file.getInputStream());
            // Retrieving the number of sheets in the Workbook
            //System.out.println("-------Workbook has '" + workbook.getNumberOfSheets() + "' Sheets-----");
            // Getting the Sheet at index zero
            Sheet sheet = workbook.getSheetAt(1);
            // Getting number of columns in the Sheet
            int noOfColumns = sheet.getRow(0).getLastCellNum();

            //System.out.println("-------Sheet has '" + noOfColumns + "' columns------");

            List<Product> productList = new ArrayList<>();
            Iterator<Row> iterator = sheet.rowIterator();
            for (int index = 0; index < sheet.getPhysicalNumberOfRows(); index++) {
                if (index > 0) {
                    ProductBasic basic = new ProductBasic();
                    ProductPrice price = new ProductPrice();

                    XSSFRow row = (XSSFRow) sheet.getRow(index);
                    if (FileUtil.isEmptyRow(row)) {
                        continue;
                    }

                    String productCategory = row.getCell(0).getStringCellValue();
                    String unitOfMeasure = row.getCell(1).getStringCellValue();
                    String productName = row.getCell(4).getStringCellValue();
                    String brandName = row.getCell(7).getStringCellValue();
                    double quantity = row.getCell(10).getNumericCellValue();
                    Double sellingPrice = row.getCell(13).getNumericCellValue();

                    // set product basic details
                    basic.setQuantity((int) quantity);
                    basic.setProductName(productName);
                    basic.setBrandName(brandName);
                    Optional<ProductCategory> optionalProductCategory = this.productCategoryUsecase.findOne(productCategory.trim());
                    optionalProductCategory.ifPresent(basic::setProductCategory);
                    Optional<ProductUnitOfMeasure> optionalUnitOfMeasure = this.unitOfMeasureUsecase.findOne(unitOfMeasure.trim());
                    optionalUnitOfMeasure.ifPresent(basic::setUnitOfMeasure);


                    // set product price details
                    price.setSellingPrice(sellingPrice);
                    price.setDiscount(0.00);
                    price.setCostPrice(0.00);
                    price.setMarkup(0.00);


                    Product savedProduct = this.save(Product.builder()
                            .price(priceUsecase.save(price))
                            .basic(basicUsecase.save(basic)).build());
                    productList.add(savedProduct);
                }
            }
            // Closing the workbook
            workbook.close();
            result.put("Total Upload ", String.valueOf(productList.size()));
            return result;
        } catch (IOException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }


}
