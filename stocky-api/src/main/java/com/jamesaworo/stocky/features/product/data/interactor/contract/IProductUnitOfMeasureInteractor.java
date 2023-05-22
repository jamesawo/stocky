package com.jamesaworo.stocky.features.product.data.interactor.contract;

import com.jamesaworo.stocky.features.product.data.request.ProductUnitOfMeasureRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface IProductUnitOfMeasureInteractor {

	ResponseEntity<List<ProductUnitOfMeasureRequest>> findAll();

	ResponseEntity<Optional<ProductUnitOfMeasureRequest>> save(ProductUnitOfMeasureRequest unitOfMeasure);

	ResponseEntity<Optional<Boolean>> remove(Long id);


	ResponseEntity<Optional<ProductUnitOfMeasureRequest>> find(Long id);

	ResponseEntity<Optional<ProductUnitOfMeasureRequest>> update(ProductUnitOfMeasureRequest request);
}
