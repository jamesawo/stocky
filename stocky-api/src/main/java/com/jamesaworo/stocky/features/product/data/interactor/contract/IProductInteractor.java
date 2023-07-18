package com.jamesaworo.stocky.features.product.data.interactor.contract;

import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.features.product.data.request.ProductRequest;
import com.jamesaworo.stocky.features.product.data.request.ProductSearchRequest;
import com.jamesaworo.stocky.features.stock.data.request.StockPriceRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

/**
 * @author Aworo James
 * @since 5/10/23
 */
public interface IProductInteractor {
    ResponseEntity<ProductRequest> save(ProductRequest request);

    ResponseEntity<PageSearchResult<List<ProductRequest>>> search(PageSearchRequest<ProductSearchRequest> request);

    ResponseEntity<List<ProductRequest>> search(String term);

    ResponseEntity<Optional<ProductRequest>> setPrice(Long productId, StockPriceRequest priceRequest);

    ResponseEntity<Optional<ProductRequest>> setQuantity(Long id, Integer quantity);

    ResponseEntity<PageSearchResult<List<ProductRequest>>> searchSalesProduct(PageSearchRequest<ProductSearchRequest> request);

}