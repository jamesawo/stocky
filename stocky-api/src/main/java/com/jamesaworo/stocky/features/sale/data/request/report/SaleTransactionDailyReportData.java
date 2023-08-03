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
    private String customer;
    private String date;
    private String time;
    private String cashier;
    private String receiptSerial;
    private Double taxAmount;
    private Double discountAmount;
    private Double subTotalAmount;
    private Double grandTotalAmount;
    private String qty;

}
