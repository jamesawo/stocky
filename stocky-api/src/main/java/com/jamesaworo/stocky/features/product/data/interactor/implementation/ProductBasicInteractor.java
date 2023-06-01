/*
 * @Author: james.junior
 * @Date: 6/1/23 19:47
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.features.product.data.interactor.contract.IProductBasicInteractor;
import com.jamesaworo.stocky.features.product.data.request.ProductBasicRequest;
import com.jamesaworo.stocky.features.product.domain.entity.ProductBasic;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductBasicUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;

@Interactor
@RequiredArgsConstructor
public class ProductBasicInteractor implements IProductBasicInteractor, Mapper<ProductBasicRequest, ProductBasic> {
	private final IProductBasicUsecase basicUsecase;
	private final ModelMapper mapper;


	@Override
	public ProductBasic save(ProductBasicRequest request) {
		ProductBasic model = this.toModel(request);
		return this.basicUsecase.save(model);
	}

	@Override
	public ProductBasicRequest toRequest(ProductBasic model) {
		return this.mapper.map(model, ProductBasicRequest.class);
	}

	@Override
	public ProductBasic toModel(ProductBasicRequest request) {
		return this.mapper.map(request, ProductBasic.class);
	}
}
