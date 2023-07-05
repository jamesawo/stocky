/*
 * @Author: james.junior
 * @Date: 5/29/23 18:44
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.product.data.repository.ProductPriceRepository;
import com.jamesaworo.stocky.features.product.domain.entity.Product;
import com.jamesaworo.stocky.features.product.domain.entity.ProductPrice;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductPriceUsecase;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductUsecase;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@Usecase
@RequiredArgsConstructor
public class ProductPriceUsecaseImpl implements IProductPriceUsecase {
	private final ProductPriceRepository repository;
	private final IProductUsecase productUsecase;


	public ProductPrice save(ProductPrice price) {
		return this.repository.save(price);
	}

	@Override
	public ProductPrice updateProductPrice(Product product, ProductPrice price) {
		Optional<Product> optionalProduct = this.productUsecase.findById(product.getId());
		optionalProduct.ifPresent((existingProduct) -> this.createOrUpdateProductPrice(existingProduct, price));
		return price;
	}

	private void createOrUpdateProductPrice(Product existingProduct, ProductPrice price) {
		ProductPrice existingProductPrice = existingProduct.getPrice();

		if (existingProductPrice != null) {
			existingProductPrice.setCostPrice(price.getCostPrice());
			existingProductPrice.setMarkup(price.getMarkup());
			existingProductPrice.setSellingPrice(price.getSellingPrice());
			ProductPrice savedProductPrice = this.save(existingProductPrice);
			this.setProductPriceAndUpdateProduct(existingProduct, savedProductPrice);
		}
		else {
			ProductPrice savedProductPrice = this.save(price);
			this.setProductPriceAndUpdateProduct(existingProduct, savedProductPrice);
			price.setId(savedProductPrice.getId());
		}
	}

	private void setProductPriceAndUpdateProduct(Product existingProduct, ProductPrice savedProductPrice) {
		existingProduct.setPrice(savedProductPrice);
		this.productUsecase.save(existingProduct);
	}

	@Override
	public Optional<ProductPrice> findPriceByProduct(Product product) {
		return this.repository.findProductPriceByProduct(product);
	}

}
