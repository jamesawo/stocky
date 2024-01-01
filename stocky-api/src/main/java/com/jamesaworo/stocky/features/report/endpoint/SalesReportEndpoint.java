/*
 * @Author: james.junior
 * @Date: 12/31/23 4:12 PM
 *
 * @Project: stocky
 */

package com.jamesaworo.stocky.features.report.endpoint;

import com.jamesaworo.stocky.features.report.data.interactor.contract.IReportSaleInteractor;
import com.jamesaworo.stocky.features.report.data.request.SaleReportRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;

@RestController
@RequestMapping(value = API_PREFIX + "/report/sales")
@RequiredArgsConstructor
public class SalesReportEndpoint {

    private final IReportSaleInteractor interactor;


    @PostMapping(value = "/collection-report")
    public ResponseEntity<byte[]> searchTransactionReport(@RequestBody SaleReportRequest request) {
        return this.interactor.getDailyCollectionReport(request);
    }

}
