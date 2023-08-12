package com.jamesaworo.stocky.features.product.domain.usecase;

import com.jamesaworo.stocky.features.product.domain.entity.ProductTax;

import java.util.List;
import java.util.Optional;

public interface IProductTaxUsecase {
    List<ProductTax> findAll();

    Optional<ProductTax> save(ProductTax model);

    Optional<Boolean> remove(Long id);

    Optional<ProductTax> findOne(Long id);

    Optional<ProductTax> findOne(String name);

    Boolean toggleStatus(boolean status, Long id);
}
