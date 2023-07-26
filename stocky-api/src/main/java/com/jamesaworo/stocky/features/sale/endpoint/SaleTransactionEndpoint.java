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

import java.util.Optional;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;
import static com.jamesaworo.stocky.core.constants.Global.SALES_TRANSACTION_ENDPOINT;

@RestController
@RequestMapping(value = API_PREFIX + SALES_TRANSACTION_ENDPOINT)
@RequiredArgsConstructor
public class SaleTransactionEndpoint {

    private final ISaleTransactionInteractor interactor;

    @PostMapping("create")
    public ResponseEntity<SaleTransactionRequest> saveTransaction(@RequestBody SaleTransactionRequest request) {
        return this.interactor.save(request);
    }

    @GetMapping("/pdf-receipt")
    public ResponseEntity<Optional<byte[]>> downloadReceiptPdf(
            @RequestParam(value = "reference") String reference,
            @RequestParam(value = "token") String token
    ) {
        return this.interactor.getReceiptPdfBytes(reference, token);
    }

}
