/*
 * @Author: james.junior
 * @Date: 12/31/23 4:20 PM
 *
 * @Project: stocky
 */

package com.jamesaworo.stocky.features.report.data.interactor.contract;

import com.jamesaworo.stocky.features.report.data.request.SaleReportRequest;
import org.springframework.http.ResponseEntity;

public interface IReportSaleInteractor {
    ResponseEntity<byte[]> getDailyCollectionReport(SaleReportRequest request);

}
