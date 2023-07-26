/*
 * @Author: james.junior
 * @Date: 7/24/23 19:54
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.domain.usecase;

import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransaction;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransactionInstallment;


public interface SaleTransactionInstallmentUsecase {

    SaleTransactionInstallment save(SaleTransactionInstallment installment);

    void saveAndSet(SaleTransaction transaction);
}
