package com.jamesaworo.stocky.features.sale.domain.usecase;

import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransactionItem;

import java.util.Optional;

public interface SaleTransactionItemUsecase {

    SaleTransactionItem save(SaleTransactionItem item);

    Optional<SaleTransactionItem> find(Long id);

}
