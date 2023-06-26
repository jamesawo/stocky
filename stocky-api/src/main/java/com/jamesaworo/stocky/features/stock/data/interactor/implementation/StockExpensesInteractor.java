/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.features.stock.data.interactor.contract.IStockExpensesInteractor;
import com.jamesaworo.stocky.features.stock.data.request.StockExpensesRequest;
import com.jamesaworo.stocky.features.stock.domain.entity.StockExpenses;
import com.jamesaworo.stocky.features.stock.domain.usecase.IStockExpensesUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;

@Interactor
@RequiredArgsConstructor
public class StockExpensesInteractor implements IStockExpensesInteractor {
	private final IStockExpensesUsecase usecase;
	private final ModelMapper mapper;


	@Override
	public StockExpensesRequest toRequest(StockExpenses model) {
		return this.mapper.map(model, StockExpensesRequest.class);
	}

	@Override
	public StockExpenses toModel(StockExpensesRequest request) {
		return this.mapper.map(request, StockExpenses.class);
	}

	@Override
	public StockExpenses save(StockExpensesRequest request) {
		StockExpenses model = toModel(request);
		return this.usecase.save(model);
	}

	@Override
	public List<StockExpenses> save(List<StockExpensesRequest> request) {
		List<StockExpenses> expenses = new ArrayList<>();
		request.forEach(stockExpensesRequest -> expenses.add(this.save(stockExpensesRequest)));
		return expenses;
	}
}
