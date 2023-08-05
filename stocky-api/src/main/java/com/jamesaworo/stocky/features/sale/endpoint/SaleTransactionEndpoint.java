/*
 * @Author: james.junior
 * @Date: 7/25/23 13:49
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.endpoint;

import com.jamesaworo.stocky.features.sale.data.interactor.contract.ISaleTransactionInteractor;
import com.jamesaworo.stocky.features.sale.data.request.SaleTransactionRequest;
import com.jamesaworo.stocky.features.sale.data.request.specification.SaleTransactionSearchRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.jamesaworo.stocky.core.constants.Global.SALES_TRANSACTION_ENDPOINT;

@RestController
@RequestMapping(value = SALES_TRANSACTION_ENDPOINT)
@RequiredArgsConstructor
public class SaleTransactionEndpoint {

    private final ISaleTransactionInteractor interactor;

    @PostMapping("/create")
    public ResponseEntity<SaleTransactionRequest> saveTransaction(@RequestBody SaleTransactionRequest transaction) {
        return this.interactor.save(transaction);
    }

    @GetMapping("/search-receipt")
    public ResponseEntity<byte[]> searchReceiptBySerial(
            @RequestParam(value = "serial") String serial
    ) {
        return this.interactor.searchReceiptBySerial(serial);
    }

    @PostMapping(value = "/search-report")
    public ResponseEntity<byte[]> searchTransactionReport(@RequestBody SaleTransactionSearchRequest request) {
        return this.interactor.searchSaleTransactionReport(request);
    }

}
