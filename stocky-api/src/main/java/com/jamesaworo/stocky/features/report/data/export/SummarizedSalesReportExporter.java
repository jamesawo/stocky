/*
 * @Author: james.junior
 * @Date: 7/25/23 14:10
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.report.data.export;

import com.jamesaworo.stocky.core.params.BiParam;
import com.jamesaworo.stocky.core.params.DataExporter;
import com.jamesaworo.stocky.core.params.DateRangeParam;
import com.jamesaworo.stocky.features.sale.data.export.SalesReportExporter;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransaction;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

import static com.jamesaworo.stocky.core.constants.ReportConstant.SALES_SUMMARIZED_REPORT_TITLE;

@Component
@RequiredArgsConstructor
public class SummarizedSalesReportExporter implements DataExporter<byte[], BiParam<List<SaleTransaction>, DateRangeParam>> {
    private final SalesReportExporter salesReportExporter;


    @Override
    public byte[] export(BiParam<List<SaleTransaction>, DateRangeParam> param) {
        DateRangeParam right = param.getRight();
        
        salesReportExporter.reportTitle = String.format(
                "%s  FROM %s - %s", SALES_SUMMARIZED_REPORT_TITLE,
                right.getStartDate().toString(),
                right.getEndDate().toString()
        );
        byte[] export = salesReportExporter.export(param.getLeft());
        salesReportExporter.reportTitle = null;
        return export;
    }
}
