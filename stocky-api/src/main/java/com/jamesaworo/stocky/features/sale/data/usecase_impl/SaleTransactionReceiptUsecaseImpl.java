/*
 * @Author: james.junior
 * @Date: 7/25/23 13:42
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.sale.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransaction;
import com.jamesaworo.stocky.features.sale.domain.usecase.SaleTransactionReceiptUsecase;
import com.jamesaworo.stocky.features.sale.domain.usecase.SaleTransactionUsecase;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@Usecase
@RequiredArgsConstructor
public class SaleTransactionReceiptUsecaseImpl implements SaleTransactionReceiptUsecase {
    private SaleTransactionUsecase usecase;


    @Override
    public Optional<String> generateReceiptUrl(Long saleTransactionId) {
        Optional<SaleTransaction> optionalSaleTransaction = this.usecase.findOne(saleTransactionId);
        return optionalSaleTransaction.map(transaction -> {
            return "";
        });
    }


}
