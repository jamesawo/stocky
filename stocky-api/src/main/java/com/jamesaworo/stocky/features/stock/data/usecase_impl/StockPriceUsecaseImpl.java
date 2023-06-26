/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.stock.data.repository.StockPriceRepository;
import com.jamesaworo.stocky.features.stock.domain.entity.StockPrice;
import com.jamesaworo.stocky.features.stock.domain.usecase.IStockPriceUsecase;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Usecase
@RequiredArgsConstructor
public class StockPriceUsecaseImpl implements IStockPriceUsecase {

	private final StockPriceRepository repository;

	@Override
	public StockPrice save(StockPrice price) {
		return this.repository.save(price);
	}

	@Override
	public Optional<StockPrice> findOne(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public List<StockPrice> findMany(List<Long> idList) {
		List<StockPrice> stockPrices = new ArrayList<>();
		idList.forEach(id -> {
			Optional<StockPrice> optionalStockPrice = this.findOne(id);
			optionalStockPrice.ifPresent(stockPrices::add);
		});
		return stockPrices;
	}

	@Override
	public List<StockPrice> saveMany(List<StockPrice> price) {
		return this.repository.saveAll(price);
	}

	@Override
	public Optional<StockPrice> updateOne(StockPrice price) {
		Optional<StockPrice> optionalStockPrice = this.findOne(price.getId());
		return optionalStockPrice.map(this::save);
	}
}
