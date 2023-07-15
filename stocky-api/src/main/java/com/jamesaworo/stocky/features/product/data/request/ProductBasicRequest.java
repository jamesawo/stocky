/*
 * @Author: james.junior
 * @Date: 5/29/23 17:33
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductBasicRequest {
    private Long id;
    private ProductCategoryRequest productCategory;
    private ProductUnitOfMeasureRequest unitOfMeasure;
    private ProductStatusRequest status;
    private Boolean isActive;
    private Boolean useQuantity;
    private Boolean isService;
    private Integer minAgeLimit;
    private String productName;
    private String brandName;
    private String sku;
    private String barcode;
    private String description;
    private Integer lowStockPoint;
    private List<ProductTaxRequest> taxes;
    private Integer quantity;
    private Long productId;
}
