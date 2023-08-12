package com.jamesaworo.stocky.features.product.domain.usecase;

import com.jamesaworo.stocky.features.product.domain.entity.ProductStatus;

import java.util.List;
import java.util.Optional;

public interface IProductStatusUsecase {
    List<ProductStatus> findAll();

    Optional<ProductStatus> save(ProductStatus model);

    Optional<Boolean> remove(Long id);

    Optional<ProductStatus> findOne(Long id);

    Optional<ProductStatus> findOne(String name);
}
