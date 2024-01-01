/*
 * @Author: james.junior
 * @Date: 7/25/23 14:10
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.report.data.export;

import com.jamesaworo.stocky.core.constants.ReportConstant;
import com.jamesaworo.stocky.core.params.BiParam;
import com.jamesaworo.stocky.core.params.DataExporter;
import com.jamesaworo.stocky.core.params.DateRangeParam;
import com.jamesaworo.stocky.core.utils.ExportUtil;
import com.jamesaworo.stocky.features.authentication.domain.entity.User;
import com.jamesaworo.stocky.features.authentication.domain.usecase.IUserUsecase;
import com.jamesaworo.stocky.features.report.data.request.DetailReportMainParam;
import com.jamesaworo.stocky.features.sale.data.export.SaleExportCommon;
import com.jamesaworo.stocky.features.sale.data.export.SalesReportExporter;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransaction;
import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.jamesaworo.stocky.core.utils.Util.formatAmount;
import static com.jamesaworo.stocky.features.sale.data.enums.SaleReportFileEnum.SALE_DETAILED_REPORT;
import static java.lang.String.valueOf;

@Component
@RequiredArgsConstructor
public class DetailedSalesReportExporter implements DataExporter<byte[], BiParam<List<SaleTransaction>, DateRangeParam>> {
    private final SaleExportCommon common;
    private final IUserUsecase userUsecase;
    private final SalesReportExporter salesReportExporter;


    @Override
    public byte[] export(BiParam<List<SaleTransaction>, DateRangeParam> param) {
        HashMap<String, Object> map = getMap(param);
        return ExportUtil.generatePDFBytes(
                map,
                SALE_DETAILED_REPORT.asInputStream(),
                new JRBeanCollectionDataSource(mainTransactionList(param.getLeft()))
        );
    }

    private HashMap<String, Object> getMap(BiParam<List<SaleTransaction>, DateRangeParam> param) {
        DateRangeParam dateRangeParam = param.getRight();
        HashMap<String, Object> map = this.common.toMap();
        map.put("reportTitle", getReportTitle(dateRangeParam));
        map.put("totalItemQty", valueOf(param.getLeft().stream().mapToInt(value -> value.getItems().size()).sum()));
        map.put("sumGrandTotalAmount", formatAmount(param.getLeft().stream().mapToDouble(value -> value.getAmount().getGrandTotal()).sum()));
        return map;
    }

    private List<DetailReportMainParam> mainTransactionList(List<SaleTransaction> list) {
        return list.stream().map(transaction -> {
            transaction.setCreatedBy(this.getUserFullName(transaction.getCreatedBy()));
            return DetailReportMainParam.fromTransaction(transaction);
        }).collect(Collectors.toList());
    }


    private String getReportTitle(DateRangeParam dateRange) {
        return String.format(
                "%s FROM %s - %s",
                ReportConstant.SALES_DETAILED_REPORT_TITLE,
                dateRange.getStartDate().toString(),
                dateRange.getEndDate().toString()
        );
    }

    private String getUserFullName(String username) {
        Optional<User> optionalUser = this.userUsecase.findByUsername(username);
        return optionalUser.map(User::getName).orElse(username);
    }

}
