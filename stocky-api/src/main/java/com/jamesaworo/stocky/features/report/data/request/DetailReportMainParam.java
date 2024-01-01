/*
 * @Author: james.junior
 * @Date: 12/31/23 4:21 PM
 *
 * @Project: stocky
 */

package com.jamesaworo.stocky.features.report.data.request;

import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransaction;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransactionItem;
import lombok.Data;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import java.util.List;
import java.util.stream.Collectors;

import static com.jamesaworo.stocky.core.constants.ReportConstant.EMPTY;
import static com.jamesaworo.stocky.core.utils.Util.formatDate;
import static com.jamesaworo.stocky.core.utils.Util.formatTime;
import static java.lang.String.valueOf;
import static org.springframework.util.ObjectUtils.isEmpty;

@Data
public class DetailReportMainParam {
    private String rowNumber;
    private String rowStaff;
    private String rowCustomer;
    private String rowTotalQty;
    private String rowReceiptNumber;
    private String rowPaymentMethod;
    private String rowDate;
    private String rowTime;
    private Double rowSubTotal;
    private Double rowTotal;
    private JRBeanCollectionDataSource rowSubItems;

    public static DetailReportMainParam fromTransaction(SaleTransaction transaction) {
        DetailReportMainParam param = new DetailReportMainParam();
        param.setRowStaff(!isEmpty(transaction.getCreatedBy()) ? transaction.getCreatedBy().toUpperCase() : EMPTY);
        param.setRowCustomer(!isEmpty(transaction.getCustomer()) ? transaction.getCustomer().getFullName().toUpperCase() : EMPTY);
        param.setRowTotalQty(valueOf(transaction.getItems().stream().mapToInt(SaleTransactionItem::getQuantity).sum()));
        param.setRowReceiptNumber(transaction.getSerial().toUpperCase());
        param.setRowPaymentMethod(transaction.getPaymentOption().getTitle().toUpperCase());
        param.setRowDate(formatDate(transaction.getDate()).toUpperCase());
        param.setRowTime(formatTime(transaction.getTime()).toUpperCase());
        param.setRowSubTotal(transaction.getAmount().getSubTotal());
        param.setRowTotal(transaction.getAmount().getGrandTotal());
        param.setRowSubItems(new JRBeanCollectionDataSource(subTransactionList(transaction.getItems())));
        return param;
    }

    private static List<DetailReportSubParam> subTransactionList(List<SaleTransactionItem> list) {
        return list.stream().map(DetailReportSubParam::fromTransactionItem).collect(Collectors.toList());
    }
}
