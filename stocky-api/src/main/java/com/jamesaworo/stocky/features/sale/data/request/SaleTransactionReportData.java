/*
 * @Author: james.junior
 * @Date: 8/3/23 01:54
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.data.request;

import lombok.Data;

@Data
public class SaleTransactionReportData {
    private String numberOfItems;
    private String customer;
    private String date;
    private String subAmount;
    private String totalAmount;
    
}
