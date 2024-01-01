/*
 * @Author: james.junior
 * @Date: 12/31/23 4:26 PM
 *
 * @Project: stocky
 */

package com.jamesaworo.stocky.features.report.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.params.BiParam;
import com.jamesaworo.stocky.core.params.DateRangeParam;
import com.jamesaworo.stocky.features.report.data.export.DetailedSalesReportExporter;
import com.jamesaworo.stocky.features.report.data.export.SummarizedSalesReportExporter;
import com.jamesaworo.stocky.features.report.data.interactor.contract.IReportSaleInteractor;
import com.jamesaworo.stocky.features.report.data.request.SaleReportRequest;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransaction;
import com.jamesaworo.stocky.features.sale.domain.usecase.SaleTransactionUsecase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static com.jamesaworo.stocky.core.constants.ReportConstant.PDF_CONTENT_TYPE;
import static com.jamesaworo.stocky.core.constants.ReportConstant.REPORT_FILE_NAME;
import static com.jamesaworo.stocky.features.sale.data.request.specification.SaleTransactionSearchSpecification.salesReportSpecification;
import static org.springframework.http.ResponseEntity.ok;

@Interactor
@RequiredArgsConstructor
public class ReportSaleInteractor implements IReportSaleInteractor {

    private final SummarizedSalesReportExporter summarizedExporter;
    private final DetailedSalesReportExporter detailedSalesReportExporter;
    private final SaleTransactionUsecase usecase;

    @Override
    public ResponseEntity<byte[]> getDailyCollectionReport(SaleReportRequest request) {
        List<SaleTransaction> sales = this.usecase.findMany(salesReportSpecification(request));
        byte[] bytes = this.getBytesByReportType(request, sales);
        return ok()
                .header(HttpHeaders.CONTENT_TYPE, PDF_CONTENT_TYPE)
                .header(HttpHeaders.CONTENT_DISPOSITION, REPORT_FILE_NAME)
                .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(bytes.length))
                .body(bytes);
    }

    private byte[] getBytesByReportType(SaleReportRequest request, List<SaleTransaction> sales) {
        BiParam<List<SaleTransaction>, DateRangeParam> param = new BiParam<>(
                sales,
                new DateRangeParam(request.getStartDate(), request.getEndDate())
        );

        switch (request.getReportType()) {
            case SUMMARIZED:
                return this.summarizedExporter.export(param);
            case DETAILED:
                return this.detailedSalesReportExporter.export(param);
            default:
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Report Type");
        }
    }
}
