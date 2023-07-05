package com.jamesaworo.stocky.features.product.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.product.data.repository.ProductRepository;
import com.jamesaworo.stocky.features.product.domain.entity.Product;
import com.jamesaworo.stocky.features.product.domain.entity.ProductBasic;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductBasicUsecase;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductUsecase;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

import static com.jamesaworo.stocky.features.product.domain.enums.ProductQuantityUpdateType.INCREMENT;

/**
 * @author Aworo James
 * @since 5/10/23
 */
@Usecase
@RequiredArgsConstructor
public class ProductUsecaseImpl implements IProductUsecase {

	private final ProductRepository repository;
	private final IProductBasicUsecase basicUsecase;

	@Override
	public Optional<Product> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public Product save(Product product) {
		return this.repository.save(product);
	}

	@Override
	public Page<Product> findMany(Specification<Product> specification, Pageable pageable) {
		return this.repository.findAll(specification, pageable);
	}

	@Override
	public List<Product> findMany(Specification<Product> specification) {
		return this.repository.findAll(specification);
	}

	@Override
	public Boolean updateProductQuantity(Product product, Integer quantity) {
		Optional<Product> optionalProduct = this.findById(product.getId());
		return optionalProduct.map(product1 -> {
			ProductBasic basic = product1.getBasic();
			int result = this.basicUsecase.updateProductQuantity(basic.getId(), quantity, INCREMENT);
			return result == 1;
		}).orElse(Boolean.FALSE);
	}
}