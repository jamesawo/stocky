/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.features.stock.data.interactor.contract.IStockSettlementInteractor;
import com.jamesaworo.stocky.features.stock.data.request.StockSettlementRequest;
import com.jamesaworo.stocky.features.stock.domain.entity.StockSettlement;
import com.jamesaworo.stocky.features.stock.domain.usecase.IStockSettlementUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;

@Interactor
@RequiredArgsConstructor
public class StockSettlementInteractor implements IStockSettlementInteractor {
	private final IStockSettlementUsecase usecase;
	private final ModelMapper mapper;


	@Override
	public StockSettlement save(StockSettlementRequest request) {
		StockSettlement model = toModel(request);
		return this.usecase.save(model);
	}

	@Override
	public StockSettlementRequest toRequest(StockSettlement model) {
		return this.mapper.map(model, StockSettlementRequest.class);
	}

	@Override
	public StockSettlement toModel(StockSettlementRequest request) {
		return this.mapper.map(request, StockSettlement.class);
	}


}
