/*
 * @Author: james.junior
 * @Date: 7/25/23 13:49
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.endpoint;

import com.jamesaworo.stocky.features.sale.data.interactor.contract.ISaleTransactionInteractor;
import com.jamesaworo.stocky.features.sale.data.request.SaleTransactionRequest;
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

    @GetMapping("/pdf-receipt")
    public ResponseEntity<byte[]> downloadReceiptPdf(
            @RequestParam(value = "ref") String reference,
            @RequestParam(value = "serial") String serial
    ) {
        return this.interactor.getReceipt(reference, serial);
    }

    @PostMapping(value = "/daily-sales-report")
    public ResponseEntity<byte[]> dailySalesShift() {
        return null;
    }

}
