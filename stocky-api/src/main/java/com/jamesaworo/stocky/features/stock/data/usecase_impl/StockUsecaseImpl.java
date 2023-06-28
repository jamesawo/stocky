/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.stock.data.repository.StockRepository;
import com.jamesaworo.stocky.features.stock.domain.entity.Stock;
import com.jamesaworo.stocky.features.stock.domain.usecase.IStockUsecase;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

@Usecase
@RequiredArgsConstructor
public class StockUsecaseImpl implements IStockUsecase {
	private final StockRepository repository;

	@Override
	public Stock save(Stock stock) {
		return this.repository.save(stock);
	}

	@Override
	public Optional<Stock> findOne(Long id) {
		return Optional.empty();
	}

	@Override
	public Page<Stock> findMany(Specification<Stock> specification, Pageable pageable) {
		return null;
	}

	@Override
	public List<Stock> findMany(Specification<Stock> specification) {
		return null;
	}
}
