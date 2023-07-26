package com.jamesaworo.stocky.features.sale.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.sale.data.repository.SaleTransactionItemRepository;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransactionItem;
import com.jamesaworo.stocky.features.sale.domain.usecase.SaleTransactionItemUsecase;
import lombok.RequiredArgsConstructor;

@Usecase
@RequiredArgsConstructor
public class SaleTransactionItemUsecaseImpl implements SaleTransactionItemUsecase {
    private final SaleTransactionItemRepository repository;


    @Override
    public SaleTransactionItem save(SaleTransactionItem item) {
        return this.repository.save(item);
    }
}
