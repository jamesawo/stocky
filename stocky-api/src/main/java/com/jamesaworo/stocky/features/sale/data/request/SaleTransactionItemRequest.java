/*
 * @Author: james.junior
 * @Date: 7/24/23 19:54
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.data.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jamesaworo.stocky.features.product.data.request.ProductRequest;
import com.jamesaworo.stocky.features.product.domain.entity.Product;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransactionItem;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SaleTransactionItemRequest {
    private Long id;
    private ProductRequest product;
    private Integer quantity;
    private Double grandTotal;
    private Double discount;
    private Double tax;
    private Double subTotal;
    private Double price;

    public static SaleTransactionItem toModel(SaleTransactionItemRequest request) {
        SaleTransactionItem item = new SaleTransactionItem();
        item.setId(request.getId());
        item.setProduct(new Product(request.getProduct().getId()));
        item.setQuantity(request.getQuantity());
        item.setGrandTotal(request.getGrandTotal());
        item.setDiscount(request.getDiscount());
        item.setTax(request.getTax());
        item.setSubTotal(request.getSubTotal());
        item.setPrice(request.price);
        return item;

    }
}
