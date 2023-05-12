package com.jamesaworo.stocky.features.product.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.product.data.repository.ProductCategoryRepository;
import com.jamesaworo.stocky.features.product.domain.entity.ProductCategory;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductCategoryUsecase;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

/**
 * @author Aworo James
 * @since 5/10/23
 */
@Usecase
@RequiredArgsConstructor
public class ProductCategoryUsecaseImpl implements IProductCategoryUsecase {
    private final ProductCategoryRepository repository;

    @Override
    public Optional<ProductCategory> findOne(Long id) {
        return this.repository.findById(id);
    }

    @Override
    public List<ProductCategory> findAll() {
        return this.repository.findAll();
    }

    @Override
    public Optional<ProductCategory> save(ProductCategory category) {
        return Optional.of(this.repository.save(category));
    }
}