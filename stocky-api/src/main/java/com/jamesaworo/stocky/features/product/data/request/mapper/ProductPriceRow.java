/*
 * @Author: james.junior
 * @Date: 8/12/23 16:30
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.data.request.mapper;

import com.jamesaworo.stocky.core.params.BiParam;
import com.jamesaworo.stocky.features.product.domain.entity.ProductPrice;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductPriceUsecase;
import lombok.Data;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.context.ApplicationContext;

import java.util.Map;
import java.util.Optional;

import static com.jamesaworo.stocky.core.utils.FileUtil.rowCellNumericValue;
import static java.util.Optional.empty;
import static java.util.Optional.of;
import static org.springframework.util.ObjectUtils.isEmpty;

@Data
public class ProductPriceRow {

    private IProductPriceUsecase priceUsecase;

    private double markupPercent;
    private double costPrice;
    private double sellingPrice;
    private double discount;
    private Row row;


    public ProductPriceRow(Row row, ApplicationContext context) {
        this.row = row;
        this.markupPercent = rowCellNumericValue(row, 11);
        this.costPrice = rowCellNumericValue(row, 12);
        this.sellingPrice = rowCellNumericValue(row, 13);
        this.discount = rowCellNumericValue(row, 14);
        this.injectBeanContext(context);
    }

    public BiParam<Boolean, Optional<ProductPrice>> mapRowToProductPriceModel(Map<String, String> scrapMap) {
        BiParam<Boolean, Optional<ProductPrice>> param = new BiParam<>(Boolean.TRUE, empty());
        ProductPrice price = new ProductPrice();

        // todo:: validate each cell before setting ProductPrice model
        // example: we can check if the cost price is higher than selling price or if the value supplied is incorrect
        // if invalid values where supplied used this.row to fill the scrap file

        price.setMarkup(!isEmpty(markupPercent) ? markupPercent : 0);
        price.setCostPrice(!isEmpty(costPrice) ? costPrice : 0);
        price.setSellingPrice(!isEmpty(sellingPrice) ? sellingPrice : 0);
        price.setDiscount(!isEmpty(discount) ? discount : 0);

        ProductPrice saved = this.priceUsecase.save(price);
        param.setRight(of(saved));
        return param;
    }

    private void injectBeanContext(ApplicationContext context) {
        this.priceUsecase = context.getBean(IProductPriceUsecase.class);
    }
}
