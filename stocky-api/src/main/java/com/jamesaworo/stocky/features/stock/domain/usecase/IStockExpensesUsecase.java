/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.domain.usecase;

import com.jamesaworo.stocky.features.stock.domain.entity.StockExpenses;

import java.util.List;
import java.util.Optional;

public interface IStockExpensesUsecase {
	StockExpenses save(StockExpenses expenses);

	Optional<StockExpenses> findOne(Long id);

	List<StockExpenses> findMany(List<Long> idList);

	List<StockExpenses> saveMany(List<StockExpenses> expenses);

	Optional<StockExpenses> updateOne(StockExpenses expenses);
}
