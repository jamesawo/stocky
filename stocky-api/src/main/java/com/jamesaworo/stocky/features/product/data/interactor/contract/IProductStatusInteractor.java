package com.jamesaworo.stocky.features.product.data.interactor.contract;

import com.jamesaworo.stocky.features.product.data.request.ProductStatusRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface IProductStatusInteractor {

	ResponseEntity<List<ProductStatusRequest>> findAll();

	ResponseEntity<Optional<ProductStatusRequest>> save(ProductStatusRequest request);

	ResponseEntity<Optional<Boolean>> remove(Long id);

	ResponseEntity<Optional<ProductStatusRequest>> find(Long id);

	ResponseEntity<Optional<ProductStatusRequest>> update(ProductStatusRequest request);
}
