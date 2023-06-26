/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.stock.data.repository.StockSettlementRepository;
import com.jamesaworo.stocky.features.stock.domain.entity.StockSettlement;
import com.jamesaworo.stocky.features.stock.domain.usecase.IStockSettlementUsecase;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Usecase
@RequiredArgsConstructor
public class StockSettlementUsecaseImpl implements IStockSettlementUsecase {

	private StockSettlementRepository repository;
	

	@Override
	public StockSettlement save(StockSettlement price) {
		return null;
	}

	@Override
	public Optional<StockSettlement> findOne(Long id) {
		return Optional.empty();
	}

	@Override
	public List<StockSettlement> findMany(List<Long> idList) {
		return null;
	}

	@Override
	public List<StockSettlement> saveMany(List<StockSettlement> settlements) {
		return null;
	}

	@Override
	public Optional<StockSettlement> updateOne(StockSettlement settlement) {
		return Optional.empty();
	}
}
