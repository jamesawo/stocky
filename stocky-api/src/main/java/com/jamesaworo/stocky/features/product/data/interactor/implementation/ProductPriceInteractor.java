/*
 * @Author: james.junior
 * @Date: 6/1/23 19:48
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.product.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.features.product.data.interactor.contract.IProductPriceInteractor;
import com.jamesaworo.stocky.features.product.data.request.ProductPriceRequest;
import com.jamesaworo.stocky.features.product.domain.entity.ProductPrice;
import com.jamesaworo.stocky.features.product.domain.usecase.IProductPriceUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;

@Interactor
@RequiredArgsConstructor
public class ProductPriceInteractor implements IProductPriceInteractor, Mapper<ProductPriceRequest, ProductPrice> {
	private final IProductPriceUsecase priceUsecase;
	private final ModelMapper mapper;


	@Override
	public ProductPrice save(ProductPriceRequest request) {
		ProductPrice model = this.toModel(request);
		return this.priceUsecase.save(model);
	}

	@Override
	public ProductPriceRequest toRequest(ProductPrice model) {
		return this.mapper.map(model, ProductPriceRequest.class);
	}

	@Override
	public ProductPrice toModel(ProductPriceRequest request) {
		return this.mapper.map(request, ProductPrice.class);
	}
}
