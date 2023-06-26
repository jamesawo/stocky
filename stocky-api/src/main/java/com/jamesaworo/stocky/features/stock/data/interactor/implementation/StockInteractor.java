/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.features.stock.data.interactor.contract.IStockExpensesInteractor;
import com.jamesaworo.stocky.features.stock.data.interactor.contract.IStockInteractor;
import com.jamesaworo.stocky.features.stock.data.interactor.contract.IStockItemInteractor;
import com.jamesaworo.stocky.features.stock.data.interactor.contract.IStockSettlementInteractor;
import com.jamesaworo.stocky.features.stock.data.request.StockRequest;
import com.jamesaworo.stocky.features.stock.data.request.StockSearchRequest;
import com.jamesaworo.stocky.features.stock.domain.entity.Stock;
import com.jamesaworo.stocky.features.stock.domain.entity.StockItem;
import com.jamesaworo.stocky.features.stock.domain.usecase.IStockUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Interactor
@RequiredArgsConstructor
public class StockInteractor implements IStockInteractor {

	private final ModelMapper mapper;
	private final IStockUsecase usecase;
	private final IStockSettlementInteractor settlementInteractor;
	private final IStockExpensesInteractor expensesInteractor;
	private final IStockItemInteractor itemInteractor;


	@Override
	public ResponseEntity<StockRequest> save(StockRequest request) {
		Stock saveStocked = this.usecase.save(this.setStockModels(request));
		request.setId(saveStocked.getId());
		return ResponseEntity.ok().body(request);
	}

	private Stock setStockModels(StockRequest request) {
		Stock model = this.toModel(request);
		this.setStockSettlementIfIsGroupedSettlement(model, request);
		this.setStockExpensesIfIsGroupedExpenses(model, request);
		this.setStockItems(model, request);
		return model;
	}

	private void setStockItems(Stock model, StockRequest request) {
		List<StockItem> stockItems = this.itemInteractor.saveMany(request.getStockItems());
		model.setStockItems(stockItems);
	}

	private void setStockSettlementIfIsGroupedSettlement(Stock model, StockRequest request) {
		if (request.getIsGroupedSettlement()) {
			model.setSettlement(this.settlementInteractor.save(request.getSettlement()));
		}
	}

	private void setStockExpensesIfIsGroupedExpenses(Stock model, StockRequest request) {
		if (request.getIsGroupedExpenses()) {
			model.setExpenses(this.expensesInteractor.save(request.getExpenses()));
		}
	}

	@Override
	public ResponseEntity<PageSearchResult<List<StockRequest>>> search(PageSearchRequest<StockSearchRequest> request) {
		return null;
	}

	@Override
	public ResponseEntity<List<StockRequest>> search(String term) {
		return null;
	}

	@Override
	public StockRequest toRequest(Stock model) {
		return this.mapper.map(model, StockRequest.class);
	}

	@Override
	public Stock toModel(StockRequest request) {
		return this.mapper.map(request, Stock.class);
	}

}

