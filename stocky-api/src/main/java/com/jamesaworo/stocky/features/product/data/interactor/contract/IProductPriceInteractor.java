package com.jamesaworo.stocky.features.product.data.interactor.contract;

import com.jamesaworo.stocky.features.product.data.request.ProductDiscountRequest;
import com.jamesaworo.stocky.features.product.data.request.ProductPriceRequest;
import com.jamesaworo.stocky.features.product.domain.entity.ProductPrice;

/**
 * @author Aworo James
 * @since 6/1/23
 */
public interface IProductPriceInteractor {
    ProductPrice save(ProductPriceRequest request);

    ProductPrice update(ProductPrice price);

    Boolean applyDiscount(ProductPrice price, ProductDiscountRequest request);

    ProductPrice update(ProductPriceRequest price);

}