/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.domain.usecase;

import com.jamesaworo.stocky.features.stock.domain.entity.StockPrice;

import java.util.List;
import java.util.Optional;

public interface IStockPriceUsecase {

	StockPrice save(StockPrice price);

	Optional<StockPrice> findOne(Long id);

	List<StockPrice> findMany(List<Long> idList);

	List<StockPrice> saveMany(List<StockPrice> price);

	Optional<StockPrice> updateOne(StockPrice price);

}
