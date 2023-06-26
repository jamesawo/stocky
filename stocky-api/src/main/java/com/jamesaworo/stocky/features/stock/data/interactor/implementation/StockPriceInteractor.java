/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.features.stock.data.interactor.contract.IStockPriceInteractor;
import com.jamesaworo.stocky.features.stock.data.request.StockPriceRequest;
import com.jamesaworo.stocky.features.stock.domain.entity.StockPrice;
import com.jamesaworo.stocky.features.stock.domain.usecase.IStockPriceUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;


@Interactor
@RequiredArgsConstructor
public class StockPriceInteractor implements IStockPriceInteractor {
	private final IStockPriceUsecase usecase;
	private final ModelMapper mapper;

	@Override
	public StockPriceRequest toRequest(StockPrice model) {
		return this.mapper.map(model, StockPriceRequest.class);
	}

	@Override
	public StockPrice toModel(StockPriceRequest request) {
		return this.mapper.map(request, StockPrice.class);
	}

	@Override
	public StockPrice save(StockPriceRequest request) {
		StockPrice model = toModel(request);
		return this.usecase.save(model);
	}


}
