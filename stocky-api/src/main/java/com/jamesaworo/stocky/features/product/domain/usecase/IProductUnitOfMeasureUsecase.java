package com.jamesaworo.stocky.features.product.domain.usecase;

import com.jamesaworo.stocky.features.product.domain.entity.ProductUnitOfMeasure;

import java.util.List;
import java.util.Optional;

public interface IProductUnitOfMeasureUsecase {
    List<ProductUnitOfMeasure> findAll();

    Optional<ProductUnitOfMeasure> save(ProductUnitOfMeasure unitOfMeasure);

    Optional<Boolean> remove(Long id);

    Optional<ProductUnitOfMeasure> findOne(Long id);

    Optional<ProductUnitOfMeasure> findOne(String name);

}
