/*
 * @Author: james.junior
 * @Date: 7/25/23 09:36
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.data.interactor.contract;

import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.features.sale.data.request.SaleTransactionRequest;
import com.jamesaworo.stocky.features.sale.data.request.specification.SaleTransactionSearchRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;


public interface ISaleTransactionInteractor {

    ResponseEntity<SaleTransactionRequest> save(SaleTransactionRequest request);

    ResponseEntity<PageSearchResult<List<SaleTransactionRequest>>> findMany(PageSearchRequest<SaleTransactionSearchRequest> request);

    ResponseEntity<List<SaleTransactionRequest>> findMany(SaleTransactionSearchRequest request);

    ResponseEntity<Optional<SaleTransactionRequest>> findOne(Long id);

    Optional<byte[]> findTransactionReceipt(String reference, String serial);
    
    ResponseEntity<byte[]> searchReceiptBySerial(String serial);

    ResponseEntity<byte[]> searchSaleTransactionReport(SaleTransactionSearchRequest request);
}
