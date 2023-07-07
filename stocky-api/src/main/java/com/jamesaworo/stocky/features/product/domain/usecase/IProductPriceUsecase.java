package com.jamesaworo.stocky.features.product.domain.usecase;

import com.jamesaworo.stocky.features.product.domain.entity.Product;
import com.jamesaworo.stocky.features.product.domain.entity.ProductPrice;

import java.util.Optional;

public interface IProductPriceUsecase {
	ProductPrice save(ProductPrice price);

	ProductPrice updateProductPrice(Product product, ProductPrice price);

	Optional<ProductPrice> findPriceByProduct(Product product);

}
