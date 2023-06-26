/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.domain.usecase;

import com.jamesaworo.stocky.features.stock.domain.entity.StockSettlement;

import java.util.List;
import java.util.Optional;

public interface IStockSettlementUsecase {

	StockSettlement save(StockSettlement price);

	Optional<StockSettlement> findOne(Long id);

	List<StockSettlement> findMany(List<Long> idList);

	List<StockSettlement> saveMany(List<StockSettlement> settlements);

	Optional<StockSettlement> updateOne(StockSettlement settlement);
}
