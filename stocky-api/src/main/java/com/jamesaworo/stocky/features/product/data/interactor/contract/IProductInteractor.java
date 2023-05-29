package com.jamesaworo.stocky.features.product.data.interactor.contract;

import com.jamesaworo.stocky.features.product.data.request.ProductRequest;
import org.springframework.http.ResponseEntity;

/**
 * @author Aworo James
 * @since 5/10/23
 */
public interface IProductInteractor {
	ResponseEntity<ProductRequest> save(ProductRequest request);
}