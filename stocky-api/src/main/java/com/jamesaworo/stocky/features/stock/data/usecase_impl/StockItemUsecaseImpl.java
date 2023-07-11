/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.stock.data.repository.StockItemRepository;
import com.jamesaworo.stocky.features.stock.domain.entity.StockItem;
import com.jamesaworo.stocky.features.stock.domain.usecase.IStockItemUsecase;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;


@Usecase
@RequiredArgsConstructor
public class StockItemUsecaseImpl implements IStockItemUsecase {
    private final StockItemRepository repository;

    @Override
    public StockItem save(StockItem item) {
        return this.repository.save(item);
    }

    @Override
    public Optional<StockItem> findOne(Long id) {
        return this.repository.findById(id);
    }

    @Override
    public List<StockItem> findMany(List<Long> idList) {
        return this.repository.findAllById(idList);
    }

    @Override
    public List<StockItem> saveMany(List<StockItem> items) {
        return this.repository.saveAll(items);
    }
}
