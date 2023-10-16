/*
 * @Author: james.junior
 * @Date: 6/26/23 18:24
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.endpoint;

import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.features.stock.data.interactor.contract.IStockInteractor;
import com.jamesaworo.stocky.features.stock.data.request.StockCounterRequest;
import com.jamesaworo.stocky.features.stock.data.request.StockCounterResponse;
import com.jamesaworo.stocky.features.stock.data.request.StockRequest;
import com.jamesaworo.stocky.features.stock.data.request.StockSearchRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;


@RestController
@RequestMapping(value = API_PREFIX + "/stock")
@RequiredArgsConstructor
public class StockEndpoint {

    private final IStockInteractor interactor;

    @PostMapping(value = "/create")
    public ResponseEntity<StockRequest> create(@RequestBody StockRequest request) {
        return this.interactor.save(request);
    }

    @PostMapping(value = "/search-request")
    public ResponseEntity<PageSearchResult<List<StockRequest>>> searchProducts(
            @Valid @RequestBody PageSearchRequest<StockSearchRequest> request
    ) {
        return this.interactor.search(request);
    }

    @GetMapping("search")
    public ResponseEntity<List<StockRequest>> search(
            @RequestParam(value = "term") String term
    ) {
        return this.interactor.search(term);
    }

    @PostMapping(value = "/count-stock")
    public ResponseEntity<PageSearchResult<StockCounterResponse>> countStock(@RequestBody StockCounterRequest request) {
        return this.interactor.countStock(request);
    }
}
