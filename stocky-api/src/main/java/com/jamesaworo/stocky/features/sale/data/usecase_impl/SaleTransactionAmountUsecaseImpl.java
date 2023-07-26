/*
 * @Author: james.junior
 * @Date: 7/25/23 09:43
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.sale.data.repository.SaleTransactionAmountRepository;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransaction;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransactionAmount;
import com.jamesaworo.stocky.features.sale.domain.usecase.SaleTransactionAmountUsecase;
import lombok.RequiredArgsConstructor;

@Usecase
@RequiredArgsConstructor
public class SaleTransactionAmountUsecaseImpl implements SaleTransactionAmountUsecase {
    private final SaleTransactionAmountRepository repository;


    @Override
    public SaleTransactionAmount save(SaleTransactionAmount amount) {
        return this.repository.save(amount);
    }

    @Override
    public void saveAndSet(SaleTransaction transaction) {
        SaleTransactionAmount save = this.save(transaction.getAmount());
        transaction.setAmount(save);
    }
}
