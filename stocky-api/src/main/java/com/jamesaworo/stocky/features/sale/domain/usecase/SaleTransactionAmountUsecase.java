package com.jamesaworo.stocky.features.sale.domain.usecase;

import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransaction;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransactionAmount;

public interface SaleTransactionAmountUsecase {

    SaleTransactionAmount save(SaleTransactionAmount amount);

    void saveAndSet(SaleTransaction transaction);


}
