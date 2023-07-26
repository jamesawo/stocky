package com.jamesaworo.stocky.features.sale.domain.usecase;

import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransactionItem;

public interface SaleTransactionItemUsecase {

    SaleTransactionItem save(SaleTransactionItem item);
    
}
