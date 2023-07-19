/*
 * @Author: james.junior
 * @Date: 5/29/23 18:44
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.product.data.repository.ProductDiscountDurationRepository;
import com.jamesaworo.stocky.features.product.data.repository.ProductPriceRepository;
import com.jamesaworo.stocky.features.product.domain.entity.ProductDiscountDuration;
import com.jamesaworo.stocky.features.product.domain.entity.ProductPrice;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductPriceUsecase;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@Usecase
@RequiredArgsConstructor
public class ProductPriceUsecaseImpl implements IProductPriceUsecase {
    private final ProductPriceRepository repository;
    private final ProductDiscountDurationRepository discountDurationRepository;


    public ProductPrice save(ProductPrice price) {
        return this.repository.save(price);
    }

    @Override
    public Optional<ProductPrice> updateProductPrice(ProductPrice price) {
        return Optional.empty();
    }

    @Override
    public ProductDiscountDuration updateDiscountDuration(ProductDiscountDuration duration) {
        Optional<ProductDiscountDuration> optional = this.discountDurationRepository.findProductDiscountDurationByPriceId(duration.getPriceId());
        return optional.map(discount -> {
            duration.setId(discount.getId());
            return this.discountDurationRepository.save(duration);
        }).orElseGet(() -> this.discountDurationRepository.save(duration));
    }

}
