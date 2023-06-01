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
import com.jamesaworo.stocky.features.product.domain.usecase.IProductBasicUsecase;
import lombok.RequiredArgsConstructor;

@Usecase
@RequiredArgsConstructor
public class ProductBasicUsecaseImpl implements IProductBasicUsecase {
	private final ProductBasicRepository repository;

	public ProductBasic save(ProductBasic basic) {
		return this.repository.save(basic);
	}
}
