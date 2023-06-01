package com.jamesaworo.stocky.features.product.data.interactor.contract;

import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.features.product.data.request.ProductRequest;
import com.jamesaworo.stocky.features.product.data.request.ProductSearchRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

/**
 * @author Aworo James
 * @since 5/10/23
 */
public interface IProductInteractor {
	ResponseEntity<ProductRequest> save(ProductRequest request);

	ResponseEntity<List<ProductSearchRequest>> search(ProductSearchRequest request);

	ResponseEntity<PageSearchResult<List<ProductRequest>>> search(PageSearchRequest<ProductSearchRequest> request);
}