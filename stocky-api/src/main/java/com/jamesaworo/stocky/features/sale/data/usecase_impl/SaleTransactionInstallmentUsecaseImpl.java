/*
 * @Author: james.junior
 * @Date: 7/24/23 19:54
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.sale.data.repository.SaleTransactionInstallmentRepository;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransaction;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransactionInstallment;
import com.jamesaworo.stocky.features.sale.domain.usecase.SaleTransactionInstallmentUsecase;
import lombok.RequiredArgsConstructor;


@Usecase
@RequiredArgsConstructor
public class SaleTransactionInstallmentUsecaseImpl implements SaleTransactionInstallmentUsecase {

    private final SaleTransactionInstallmentRepository repository;


    @Override
    public SaleTransactionInstallment save(SaleTransactionInstallment installment) {
        return this.repository.save(installment);
    }

    @Override
    public void saveAndSet(SaleTransaction transaction) {
        SaleTransactionInstallment savedInstallment = this.save(transaction.getInstallment());
        transaction.setInstallment(savedInstallment);
    }
}
