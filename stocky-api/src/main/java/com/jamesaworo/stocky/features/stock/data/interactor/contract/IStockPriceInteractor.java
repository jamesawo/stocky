/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.data.interactor.contract;

import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.features.stock.data.request.StockPriceRequest;
import com.jamesaworo.stocky.features.stock.domain.entity.StockPrice;


public interface IStockPriceInteractor extends Mapper<StockPriceRequest, StockPrice> {
	StockPrice save(StockPriceRequest request);
}
