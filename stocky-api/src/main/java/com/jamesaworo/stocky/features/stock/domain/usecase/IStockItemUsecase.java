/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.domain.usecase;

import com.jamesaworo.stocky.features.stock.domain.entity.StockItem;

import java.util.List;
import java.util.Optional;


public interface IStockItemUsecase {

	StockItem save(StockItem item);

	Optional<StockItem> findOne(Long id);

	List<StockItem> findMany(List<Long> idList);

	List<StockItem> saveMany(List<StockItem> items);
}
