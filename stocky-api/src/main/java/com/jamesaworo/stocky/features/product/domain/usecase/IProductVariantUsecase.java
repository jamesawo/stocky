package com.jamesaworo.stocky.features.product.domain.usecase;

import com.jamesaworo.stocky.features.product.domain.entity.ProductVariant;

import java.util.List;
import java.util.Optional;

/**
 * @author Aworo James
 * @since 5/10/23
 */
public interface IProductVariantUsecase {
    ProductVariant save(ProductVariant variant);

    List<ProductVariant> findAll();

    Optional<ProductVariant> findOne(Long id);


}