/*
 * @Author: james.junior
 * @Date: 5/29/23 17:23
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductRequest {
    private Long id;
    private ProductBasicRequest basic;
    private ProductPriceRequest price;
    private String createdAt;
    private Boolean isActiveStatus;
}
