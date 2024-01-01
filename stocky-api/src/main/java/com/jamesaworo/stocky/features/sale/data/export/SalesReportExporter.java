/*
 * @Author: james.junior
 * @Date: 7/25/23 14:10
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.data.export;

import com.jamesaworo.stocky.core.constants.ReportConstant;
import com.jamesaworo.stocky.core.params.DataExporter;
import com.jamesaworo.stocky.core.utils.ExportUtil;
import com.jamesaworo.stocky.features.authentication.domain.entity.User;
import com.jamesaworo.stocky.features.authentication.domain.usecase.IUserUsecase;
import com.jamesaworo.stocky.features.sale.data.request.report.SaleTransactionDailyReportData;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransaction;
import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.jamesaworo.stocky.core.utils.Util.formatAmount;
import static com.jamesaworo.stocky.features.sale.data.enums.SaleReportFileEnum.SALE_SHIFT_REPORT;
import static com.jamesaworo.stocky.features.sale.data.request.report.SaleTransactionDailyReportData.mapFromTransaction;
import static java.lang.String.valueOf;
import static org.apache.commons.lang3.ObjectUtils.isNotEmpty;

@Component
@RequiredArgsConstructor
public class SalesReportExporter implements DataExporter<byte[], List<SaleTransaction>> {
    private final SaleExportCommon common;
    private final IUserUsecase userUsecase;

    public String reportTitle = null;

    @Override
    public byte[] export(List<SaleTransaction> data) {
        HashMap<String, Object> map = getReportParamMap(data);
        return ExportUtil.generatePDFBytes(map, SALE_SHIFT_REPORT.asInputStream(), new JREmptyDataSource());
    }

    private HashMap<String, Object> getReportParamMap(List<SaleTransaction> data) {
        HashMap<String, Object> map = this.common.toMap();
        map.put("reportTitle", getReportTitle());
        map.put("transactionList", new JRBeanCollectionDataSource(mapFromTransactionList(data)));
        map.put("sumGrandTotalAmount", formatAmount(data.stream().mapToDouble(value -> value.getAmount().getGrandTotal()).sum()));
        map.put("totalQty", valueOf(data.stream().mapToInt(value -> value.getItems().size()).sum()));
        return map;
    }

    private List<SaleTransactionDailyReportData> mapFromTransactionList(List<SaleTransaction> data) {
        return data.stream().map(transaction -> {
                    transaction.setCreatedBy(this.getUserFullName(transaction.getCreatedBy()));
                    return mapFromTransaction(transaction);
                }
        ).collect(Collectors.toList());
    }

    private String getUserFullName(String username) {
        Optional<User> optionalUser = this.userUsecase.findByUsername(username);
        return optionalUser.map(User::getName).orElse(username);
    }

    private String getReportTitle() {
        if (isNotEmpty(this.reportTitle)) {
            return this.reportTitle;
        }
        return ReportConstant.SALES_REPORT_TITLE;
    }

}
