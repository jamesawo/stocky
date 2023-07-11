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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Usecase
@RequiredArgsConstructor
public class StockSettlementUsecaseImpl implements IStockSettlementUsecase {

    private final StockSettlementRepository repository;


    @Override
    public StockSettlement save(StockSettlement settlement) {
        return this.repository.save(settlement);
    }

    @Override
    public Optional<StockSettlement> findOne(Long id) {
        return this.repository.findById(id);
    }

    @Override
    public List<StockSettlement> findMany(List<Long> idList) {
        List<StockSettlement> settlements = new ArrayList<>();
        idList.forEach(id -> this.findOne(id).ifPresent(settlements::add));
        return settlements;
    }

    @Override
    public List<StockSettlement> saveMany(List<StockSettlement> settlements) {
        return this.repository.saveAll(settlements);
    }

    @Override
    public Optional<StockSettlement> updateOne(StockSettlement settlement) {
        Optional<StockSettlement> optionalStockSettlement = this.findOne(settlement.getId());
        return optionalStockSettlement.map(c -> this.save(settlement));
    }
}
