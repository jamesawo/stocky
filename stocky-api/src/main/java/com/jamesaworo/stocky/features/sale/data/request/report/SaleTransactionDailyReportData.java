/*
 * @Author: james.junior
 * @Date: 8/3/23 01:54
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.data.request.report;

import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransaction;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransactionItem;
import lombok.Data;

import static com.jamesaworo.stocky.core.constants.ReportConstant.EMPTY;
import static com.jamesaworo.stocky.core.utils.Util.formatDate;
import static com.jamesaworo.stocky.core.utils.Util.formatTime;
import static java.lang.String.valueOf;
import static org.springframework.util.ObjectUtils.isEmpty;

@Data
public class SaleTransactionDailyReportData {
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
    private String paymentMethod;


    public static SaleTransactionDailyReportData mapFromTransaction(SaleTransaction transaction) {
        SaleTransactionDailyReportData reportData = new SaleTransactionDailyReportData();
        reportData.setDate(formatDate(transaction.getDate()).toUpperCase());
        reportData.setTime(formatTime(transaction.getTime()).toUpperCase());
        reportData.setCashier(!isEmpty(transaction.getCreatedBy()) ? transaction.getCreatedBy().toUpperCase() : EMPTY);
        reportData.setCustomer(!isEmpty(transaction.getCustomer()) ? transaction.getCustomer().getFullName().toUpperCase() : EMPTY);
        reportData.setReceiptSerial(transaction.getSerial().toUpperCase());
        reportData.setTaxAmount(transaction.getAmount().getTaxTotal());
        reportData.setDiscountAmount(transaction.getAmount().getDiscountTotal());
        reportData.setSubTotalAmount(transaction.getAmount().getSubTotal());
        reportData.setGrandTotalAmount(transaction.getAmount().getGrandTotal());
        reportData.setQty(valueOf(transaction.getItems().stream().mapToInt(SaleTransactionItem::getQuantity).sum()));
        reportData.setPaymentMethod(transaction.getPaymentOption().getTitle().toUpperCase());
        return reportData;
    }

}
