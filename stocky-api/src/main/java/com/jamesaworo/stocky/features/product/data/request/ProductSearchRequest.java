package com.jamesaworo.stocky.features.product.data.request;

import com.jamesaworo.stocky.core.params.DateRangeParam;
import com.jamesaworo.stocky.core.params.MinMaxAmountParam;
import lombok.Data;

import java.util.List;

/**
 * @author Aworo James
 * @since 5/10/23
 */
@Data
public class ProductSearchRequest {
    private Long id;
    private String productName;
    private String brandName;
    private String sku;
    private DateRangeParam dateRangeParam;
    private MinMaxAmountParam sellingPriceParam;
    private MinMaxAmountParam costPriceParam;
    private ProductCategoryRequest category;
    private List<ProductTaxRequest> taxes;
    private Boolean isService;
    private ProductStatusRequest status;
    private Boolean isActive;
    private String productOrBrandName;
    private List<ProductCategoryRequest> categories;
}