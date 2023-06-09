package com.jamesaworo.stocky.features.product.domain.usecase;

import com.jamesaworo.stocky.features.product.domain.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

/**
 * @author Aworo James
 * @since 5/10/23
 */
public interface IProductUsecase {

	Optional<Product> findById(Long id);

	Product save(Product product);

	Page<Product> findMany(Specification<Product> specification, Pageable pageable);

	List<Product> findMany(Specification<Product> specification);

	Boolean updateProductQuantity(Product product, Integer quantity);
}