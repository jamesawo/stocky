/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.stock.data.repository.StockExpensesRepository;
import com.jamesaworo.stocky.features.stock.domain.entity.StockExpenses;
import com.jamesaworo.stocky.features.stock.domain.usecase.IStockExpensesUsecase;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Usecase
@RequiredArgsConstructor
public class StockExpensesUsecaseImpl implements IStockExpensesUsecase {
	private final StockExpensesRepository repository;

	@Override
	public StockExpenses save(StockExpenses expenses) {
		return null;
	}

	@Override
	public Optional<StockExpenses> findOne(Long id) {
		return Optional.empty();
	}

	@Override
	public List<StockExpenses> findMany(List<Long> idList) {
		return null;
	}

	@Override
	public List<StockExpenses> saveMany(List<StockExpenses> expenses) {
		return null;
	}

	@Override
	public Optional<StockExpenses> updateOne(StockExpenses expenses) {
		return Optional.empty();
	}
}
