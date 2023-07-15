/*
 * @Author: james.junior
 * @Date: 5/21/23 21:19
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jamesaworo.stocky.features.product.domain.entity.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductStatusRequest {
    private Long id;
    private String title;
    private String description;
    private Boolean isActiveStatus;

    public ProductStatus toModel() {
        return new ProductStatus(this.id);
    }
}
