/*
 * @Author: james.junior
 * @Date: 8/12/23 15:36
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.data.request.mapper;

import com.jamesaworo.stocky.core.params.BiParam;
import com.jamesaworo.stocky.features.product.domain.entity.ProductBasic;
import com.jamesaworo.stocky.features.product.domain.entity.ProductCategory;
import com.jamesaworo.stocky.features.product.domain.entity.ProductTax;
import com.jamesaworo.stocky.features.product.domain.entity.ProductUnitOfMeasure;
import com.jamesaworo.stocky.features.product.domain.usecase.*;
import lombok.Data;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.context.ApplicationContext;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.jamesaworo.stocky.core.constants.ReportConstant.*;
import static com.jamesaworo.stocky.core.utils.FileUtil.*;
import static java.lang.String.format;
import static java.util.Optional.empty;
import static java.util.Optional.of;
import static org.springframework.util.ObjectUtils.isEmpty;

@Data
public class ProductBasicRow {

    private IProductCategoryUsecase productCategoryUsecase;
    private IProductUnitOfMeasureUsecase unitOfMeasureUsecase;
    private IProductStatusUsecase productStatusUsecase;
    private IProductTaxUsecase taxUsecase;
    private IProductBasicUsecase basicUsecase;

    private String category;
    private String unitOfMeasure;
    private String productStatus;
    private String taxes;
    private String productName;
    private String sku;
    private String barcode;
    private String brandName;
    private String description;
    private String serviceOrProduct;
    private double quantity;
    private Row row;

    public ProductBasicRow(Row row, ApplicationContext context) {
        this.row = row;
        this.category = row.getCell(0).getStringCellValue();
        this.unitOfMeasure = row.getCell(1).getStringCellValue();
        //this.productStatus = row.getCell(2).getStringCellValue();
        //this.taxes = row.getCell(3).getStringCellValue();
        this.productName = row.getCell(4).getStringCellValue();
        //this.sku = row.getCell(5).getStringCellValue();
        //this.barcode = row.getCell(6).getStringCellValue();
        this.brandName = row.getCell(7).getStringCellValue();
        //this.description = row.getCell(8).getStringCellValue();
        //this.serviceOrProduct = row.getCell(9).getStringCellValue();
        this.quantity = row.getCell(10).getNumericCellValue();
        this.injectBeans(context);
    }

    public BiParam<Boolean, Optional<ProductBasic>> mapRowToProductBasicModel(Map<String, String> map, int rowIndex) {

        // if left side is true, it indicates that there was no problem gathering the product basic model from the sheet row
        BiParam<Boolean, Optional<ProductBasic>> param = new BiParam<>(Boolean.TRUE, empty());

        ProductBasic basic = new ProductBasic();

        // checks if productName and brandName already exists in product records
        if (!isEmpty(productName) && !isEmpty(brandName)) {
            Optional<?> optionalNameAndBrand = this.basicUsecase.findByNameAndBrand(productName, brandName);
            if (optionalNameAndBrand.isPresent()) {
                putInScrapLog(map, row, 4, rowNumber(rowIndex), format(GENERIC_EXISTS, PRD, "Name & BrandName", "Name: " + productName + ", BrandeName: " + brandName));
                param.setLeft(false);
            }
        }

        /*

        // checks if barcode already exists in product records
        if (!isEmpty(barcode)) {
            Optional<?> optionalBarcode = this.basicUsecase.findByBarcode(barcode);
            if (optionalBarcode.isPresent()) {
                putInScrapLog(map, row, 6, rowNumber(rowIndex), format(GENERIC_EXISTS, PRD, "Barcode", barcode));
                param.setLeft(false);
            }
        }

        // checks if sku already exists in product records
        if (!isEmpty(sku)) {
            Optional<?> optionalSku = this.basicUsecase.findBySku(sku);
            if (optionalSku.isPresent()) {
                putInScrapLog(map, row, 5, rowNumber(rowIndex), format(GENERIC_EXISTS, PRD, "Sku", sku));
                param.setLeft(false);
            }
        }

        */

        // product category
        if (isEmpty(category)) {
            putInScrapLog(map, row, 0, rowNumber(rowIndex), CELL_EMPTY);
            param.setLeft(false);
        } else {
            Optional<ProductCategory> optionalCategory = this.productCategoryUsecase.findOne(category);
            if (optionalCategory.isPresent()) {
                basic.setProductCategory(optionalCategory.get());
            } else {
                putInScrapLog(map, row, 0, rowNumber(rowIndex), format(NO_CATEGORY_EXISTS, category));
                param.setLeft(false);
            }
        }


        // unit of measure
        if (isEmpty(unitOfMeasure)) {
            putInScrapLog(map, row, 1, rowNumber(rowIndex), CELL_EMPTY);
            param.setLeft(false);
        } else {
            Optional<ProductUnitOfMeasure> optionalMeasure = this.unitOfMeasureUsecase.findOne(unitOfMeasure);
            if (optionalMeasure.isPresent()) {
                basic.setUnitOfMeasure(optionalMeasure.get());
            } else {
                putInScrapLog(map, row, 1, rowNumber(rowIndex), category + DONT_EXIST);
                param.setLeft(false);
            }
        }

        /*

        // product status
        if (isEmpty(productStatus)) {
            putInScrapLog(map, row, 2, rowNumber(rowIndex), CELL_EMPTY);
            param.setLeft(false);
        } else {
            Optional<ProductStatus> optionalProductStatus = this.productStatusUsecase.findOne(productStatus);
            if (optionalProductStatus.isPresent()) {
                basic.setStatus(optionalProductStatus.get());
            } else {
                putInScrapLog(map, row, 2, rowNumber(rowIndex), productStatus + DONT_EXIST);
                param.setLeft(false);
            }
        }

        // tax
        if (isEmpty(taxes)) {
            putInScrapLog(map, row, 3, rowNumber(rowIndex), CELL_EMPTY);
            param.setLeft(false);
        } else {
            BiParam<StringOrStringArray, BiParam<String, String[]>> stringOrStringArrayBiParam = splitCellValueSeperatedByComma(taxes);
            List<ProductTax> taxList = new ArrayList<>();
            if (stringOrStringArrayBiParam.getLeft().equals(STRING)) {
                addTaxIfPresent(taxList, stringOrStringArrayBiParam.getRight().getLeft(), map, rowIndex, param);
            } else {
                for (String taxName : stringOrStringArrayBiParam.getRight().getRight()) {
                    addTaxIfPresent(taxList, taxName.trim(), map, rowIndex, param);
                }
            }

            if (taxList.size() > 0) {
                basic.setTaxes(taxList);
            }

        }

        */

        // product name
        if (isEmpty(productName)) {
            putInScrapLog(map, row, 4, rowNumber(rowIndex), CELL_EMPTY);
            param.setLeft(false);
        } else {
            basic.setProductName(productName);
        }

        // sku
        if (!isEmpty(sku)) {
            basic.setSku(sku);
        }

        // barcode
        if (!isEmpty(barcode)) {
            basic.setBarcode(barcode);
        }

        // brandName
        if (isEmpty(brandName)) {
            putInScrapLog(map, row, 7, rowNumber(rowIndex), CELL_EMPTY);
            param.setLeft(false);
        } else {
            basic.setBrandName(brandName);
        }

        // description
        if (!isEmpty(description)) {
            basic.setDescription(description);
        }

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
        if (isEmpty(quantity)) {
            putInScrapLog(map, row, 10, rowNumber(rowIndex), CELL_EMPTY + SPACE + "quantity");
            param.setLeft(false);
        } else {
            basic.setQuantity(cellDoubleValueToInt(quantity));
        }

        // checks if there has been any error
        if (param.getLeft()) {
            ProductBasic saved = this.basicUsecase.save(basic);
            param.setRight(of(saved));
        }

        return param;
    }

    private void injectBeans(ApplicationContext context) {
        this.taxUsecase = context.getBean(IProductTaxUsecase.class);
        this.basicUsecase = context.getBean(IProductBasicUsecase.class);
        this.productStatusUsecase = context.getBean(IProductStatusUsecase.class);
        this.productCategoryUsecase = context.getBean(IProductCategoryUsecase.class);
        this.unitOfMeasureUsecase = context.getBean(IProductUnitOfMeasureUsecase.class);
    }

    private void addTaxIfPresent(
            List<ProductTax> taxes,
            String taxName,
            Map<String, String> map,
            int rowIndex,
            BiParam<Boolean, Optional<ProductBasic>> param
    ) {
        Optional<ProductTax> optionalTax = taxUsecase.findOne(taxName);
        if (optionalTax.isPresent()) {
            taxes.add(optionalTax.get());
        } else {
            putInScrapLog(map, row, 3, rowNumber(rowIndex), taxName + DONT_EXIST);
            param.setLeft(false);
        }
    }

}
