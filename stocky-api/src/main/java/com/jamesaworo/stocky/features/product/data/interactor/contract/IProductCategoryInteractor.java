package com.jamesaworo.stocky.features.product.data.interactor.contract;

import com.jamesaworo.stocky.features.product.data.request.ProductCategoryRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

/**
 * @author Aworo James
 * @since 5/10/23
 */
public interface IProductCategoryInteractor {

	ResponseEntity<ProductCategoryRequest> find(Long id);

	ResponseEntity<List<ProductCategoryRequest>> findMany();

	ResponseEntity<Optional<ProductCategoryRequest>> save(ProductCategoryRequest request);

	ResponseEntity<Optional<ProductCategoryRequest>> update(ProductCategoryRequest request);

	ResponseEntity<Optional<Boolean>> remove(Long id);

	ResponseEntity<List<ProductCategoryRequest>> search(String term);

	ResponseEntity<Optional<Boolean>> toggleActiveStatus(Long id);
}