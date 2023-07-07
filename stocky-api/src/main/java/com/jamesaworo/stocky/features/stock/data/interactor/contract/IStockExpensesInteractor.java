/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.data.interactor.contract;

import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.features.stock.data.request.StockExpensesRequest;
import com.jamesaworo.stocky.features.stock.domain.entity.StockExpenses;

import java.util.List;

public interface IStockExpensesInteractor extends Mapper<StockExpensesRequest, StockExpenses> {
	StockExpenses saveOne(StockExpensesRequest request);

	List<StockExpenses> saveMany(List<StockExpensesRequest> request);

}
