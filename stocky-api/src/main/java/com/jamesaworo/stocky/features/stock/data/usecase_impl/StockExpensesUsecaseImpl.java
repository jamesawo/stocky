/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.stock.data.repository.StockExpensesRepository;
import com.jamesaworo.stocky.features.stock.domain.entity.StockExpenses;
import com.jamesaworo.stocky.features.stock.domain.usecase.IStockExpensesUsecase;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Usecase
@RequiredArgsConstructor
public class StockExpensesUsecaseImpl implements IStockExpensesUsecase {
    private final StockExpensesRepository repository;

    @Override
    public StockExpenses save(StockExpenses expenses) {
        return this.repository.save(expenses);
    }

    @Override
    public Optional<StockExpenses> findOne(Long id) {
        return this.repository.findById(id);
    }

    @Override
    public List<StockExpenses> findMany(List<Long> idList) {
        List<StockExpenses> expenses = new ArrayList<>();
        idList.forEach(id -> this.findOne(id).ifPresent(expenses::add));
        return expenses;
    }

    @Override
    public List<StockExpenses> saveMany(List<StockExpenses> expenses) {
        return this.repository.saveAll(expenses);
    }

    @Override
    public Optional<StockExpenses> updateOne(StockExpenses expenses) {
        Optional<StockExpenses> optionalExpenses = this.findOne(expenses.getId());
        return optionalExpenses.map(c -> this.save(expenses));
    }
}
