package com.jamesaworo.stocky.features.product.domain.usecase;

import com.jamesaworo.stocky.features.product.domain.entity.ProductBasic;
import com.jamesaworo.stocky.features.product.domain.enums.ProductQuantityUpdateType;

import java.util.Optional;

public interface IProductBasicUsecase {
    ProductBasic save(ProductBasic basic);

    int updateProductQuantity(Long basicId, Integer quantity, ProductQuantityUpdateType updateType);

    Optional<ProductBasic> findByNameAndBrand(String name, String brand);

    Optional<ProductBasic> findByBarcode(String barcode);

    Optional<ProductBasic> findBySku(String sku);
}
