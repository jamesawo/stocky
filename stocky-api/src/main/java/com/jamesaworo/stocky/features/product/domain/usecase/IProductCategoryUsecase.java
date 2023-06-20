package com.jamesaworo.stocky.features.product.domain.usecase;

import com.jamesaworo.stocky.features.product.domain.entity.ProductCategory;

import java.util.List;
import java.util.Optional;

/**
 * @author Aworo James
 * @since 5/10/23
 */
public interface IProductCategoryUsecase {
	Optional<ProductCategory> findOne(Long id);

	List<ProductCategory> findAll();

	Optional<ProductCategory> save(ProductCategory category);

	Optional<Boolean> remove(Long id);

	List<ProductCategory> search(String term);

	Boolean toggleStatus(boolean b, Long id);
}