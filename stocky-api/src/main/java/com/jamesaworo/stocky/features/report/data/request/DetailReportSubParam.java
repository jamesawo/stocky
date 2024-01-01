/*
 * @Author: james.junior
 * @Date: 12/31/23 4:21 PM
 *
 * @Project: stocky
 */

package com.jamesaworo.stocky.features.report.data.request;

import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransactionItem;
import lombok.Data;

@Data
public class DetailReportSubParam {
    private String itemName;
    private String itemQty;
    private Double itemSubTotal;
    private Double itemTotal;
    private Double itemPrice;

    public static DetailReportSubParam fromTransactionItem(SaleTransactionItem saleItem) {
        DetailReportSubParam param = new DetailReportSubParam();
        param.setItemName(saleItem.getProduct().getBasic().title());
        param.setItemQty(saleItem.getQuantity().toString());
        param.setItemSubTotal(saleItem.getSubTotal());
        param.setItemTotal(saleItem.getGrandTotal());
        param.setItemPrice(saleItem.getPrice());
        return param;
    }
}
