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
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransaction;
import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

import static com.jamesaworo.stocky.core.utils.Util.formatAmount;
import static com.jamesaworo.stocky.features.sale.data.enums.SaleReportFileEnum.SALE_REPORT;
import static com.jamesaworo.stocky.features.sale.data.request.report.SaleTransactionDailyReportData.mapFromTransactionList;
import static java.lang.String.valueOf;

@Component
@RequiredArgsConstructor
public class SalesReportExporter implements DataExporter<byte[], List<SaleTransaction>> {
    private final SaleExportCommon common;

    @Override
    public byte[] export(List<SaleTransaction> data) {
        HashMap<String, Object> map = getReportParamMap(data);
        return ExportUtil.generatePDFBytes(map, SALE_REPORT.asInputStream(), new JREmptyDataSource());
    }

    private HashMap<String, Object> getReportParamMap(List<SaleTransaction> data) {
        HashMap<String, Object> map = this.common.toMap();
        map.put("reportTitle", ReportConstant.SALES_REPORT_TITLE);
        map.put("transactionList", new JRBeanCollectionDataSource(mapFromTransactionList(data)));
        map.put("sumGrandTotalAmount", formatAmount(data.stream().mapToDouble(value -> value.getAmount().getGrandTotal()).sum()));
        map.put("totalQty", valueOf(data.stream().mapToInt(value -> value.getItems().size()).sum()));
        return map;
    }

}
