/*
 * @Author: james.junior
 * @Date: 7/24/23 19:54
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransactionAmount;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SaleTransactionAmountRequest {
    private Long id;
    private Double grandTotal;
    private Double discountTotal;
    private Double taxTotal;
    private Double subTotal;

    public static SaleTransactionAmount toModel(SaleTransactionAmountRequest request) {

        SaleTransactionAmount amount = new SaleTransactionAmount();
        amount.setGrandTotal(request.getGrandTotal());
        amount.setDiscountTotal(request.getDiscountTotal());
        amount.setSubTotal(request.getSubTotal());
        amount.setTaxTotal(request.getTaxTotal());
        amount.setId(request.getId());
        return amount;

    }
}
