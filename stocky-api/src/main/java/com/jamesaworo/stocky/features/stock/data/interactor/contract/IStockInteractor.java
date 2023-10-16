/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.data.interactor.contract;

import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.features.stock.data.request.StockCounterRequest;
import com.jamesaworo.stocky.features.stock.data.request.StockCounterResponse;
import com.jamesaworo.stocky.features.stock.data.request.StockRequest;
import com.jamesaworo.stocky.features.stock.data.request.StockSearchRequest;
import com.jamesaworo.stocky.features.stock.domain.entity.Stock;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IStockInteractor extends Mapper<StockRequest, Stock> {
    ResponseEntity<StockRequest> save(StockRequest request);

    ResponseEntity<PageSearchResult<List<StockRequest>>> search(PageSearchRequest<StockSearchRequest> request);

    ResponseEntity<List<StockRequest>> search(String term);

    ResponseEntity<PageSearchResult<StockCounterResponse>> countStock(StockCounterRequest request);
}

