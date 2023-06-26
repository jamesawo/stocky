/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.data.interactor.contract;

import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.features.stock.data.request.StockItemRequest;
import com.jamesaworo.stocky.features.stock.domain.entity.StockItem;

import java.util.List;

public interface IStockItemInteractor extends Mapper<StockItemRequest, StockItem> {
	List<StockItem> saveMany(List<StockItemRequest> requests);

	StockItem save(StockItem item);
}
