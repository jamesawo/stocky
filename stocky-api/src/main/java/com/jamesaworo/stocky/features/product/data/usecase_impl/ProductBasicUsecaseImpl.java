/*
 * @Author: james.junior
 * @Date: 5/29/23 18:44
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.product.data.repository.ProductBasicRepository;
import com.jamesaworo.stocky.features.product.domain.entity.ProductBasic;
import com.jamesaworo.stocky.features.product.domain.enums.ProductQuantityUpdateType;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductBasicUsecase;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

import static com.jamesaworo.stocky.features.product.domain.enums.ProductQuantityUpdateType.DECREMENT;
import static com.jamesaworo.stocky.features.product.domain.enums.ProductQuantityUpdateType.INCREMENT;

@Usecase
@RequiredArgsConstructor
public class ProductBasicUsecaseImpl implements IProductBasicUsecase {
    private final ProductBasicRepository repository;

    public ProductBasic save(ProductBasic basic) {
        return this.repository.save(basic);
    }

    @Override
    public int updateProductQuantity(Long basicId, Integer quantity, ProductQuantityUpdateType updateType) {
        if (updateType == INCREMENT) {
            return this.repository.incrementQuantity(basicId, quantity);
        } else if (updateType == DECREMENT) {
            return this.repository.decrementQuantity(basicId, quantity);
        } else {
            return 0;
        }
    }

    @Override
    public Optional<ProductBasic> findByNameAndBrand(String name, String brand) {
        return this.repository.findByProductNameEqualsIgnoreCaseAndBrandNameEqualsIgnoreCase(name, brand);
    }

    @Override
    public Optional<ProductBasic> findByBarcode(String barcode) {
        return this.repository.findByBarcodeEqualsIgnoreCase(barcode);
    }

    @Override
    public Optional<ProductBasic> findBySku(String sku) {
        return this.repository.findBySkuEqualsIgnoreCase(sku);
    }
}
