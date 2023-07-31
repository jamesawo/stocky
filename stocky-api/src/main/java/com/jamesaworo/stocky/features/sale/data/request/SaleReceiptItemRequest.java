/*
 * @Author: james.junior
 * @Date: 7/29/23 19:31
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.data.request;

import lombok.Data;

@Data
public class SaleReceiptItemRequest {
    private String quantity;
    private String name;
    private String price;
}
