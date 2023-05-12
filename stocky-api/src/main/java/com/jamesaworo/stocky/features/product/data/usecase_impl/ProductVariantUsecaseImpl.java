package com.jamesaworo.stocky.features.product.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.product.data.repository.ProductVariantRepository;
import com.jamesaworo.stocky.features.product.domain.entity.ProductVariant;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductVariantUsecase;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

/**
 * @author Aworo James
 * @since 5/10/23
 */
@Usecase
@RequiredArgsConstructor
public class ProductVariantUsecaseImpl implements IProductVariantUsecase {
    private final ProductVariantRepository repository;

    @Override
    public ProductVariant save(ProductVariant variant) {
        return this.repository.save(variant);
    }

    @Override
    public List<ProductVariant> findAll() {
        return this.repository.findAll();
    }

    @Override
    public Optional<ProductVariant> findOne(Long id) {
        return this.repository.findById(id);
    }
}