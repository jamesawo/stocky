/*
 * @Author: james.junior
 * @Date: 5/29/23 18:44
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.product.data.repository.ProductPriceRepository;
import com.jamesaworo.stocky.features.product.domain.entity.ProductPrice;
import com.jamesaworo.stocky.features.product.domain.entity.ProductTax;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductPriceUsecase;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Usecase
@RequiredArgsConstructor
public class ProductPriceUsecaseImpl implements IProductPriceUsecase {
	private final ProductPriceRepository repository;

	public ProductPrice save(ProductPrice price) {
		List<ProductTax> taxes = price.getTaxes();
		ProductPrice productPrice = this.savePriceWithoutTaxes(price);
		productPrice.setTaxes(taxes);
		return this.repository.save(productPrice);
	}

	private ProductPrice savePriceWithoutTaxes(ProductPrice price) {
		price.setTaxes(null);
		return this.repository.save(price);
	}
}
