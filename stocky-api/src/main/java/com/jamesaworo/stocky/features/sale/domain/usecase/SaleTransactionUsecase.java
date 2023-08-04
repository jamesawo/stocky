package com.jamesaworo.stocky.features.sale.domain.usecase;

import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransaction;
import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransactionItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

public interface SaleTransactionUsecase {

    SaleTransaction save(SaleTransaction saleTransaction, List<SaleTransactionItem> transactionItems);

    Page<SaleTransaction> findMany(Specification<SaleTransaction> specification, Pageable pageable);

    List<SaleTransaction> findMany(Specification<SaleTransaction> specification);

    Optional<SaleTransaction> findOne(Long id);


    Optional<SaleTransaction> findOne(String reference, String token);

    Optional<SaleTransaction> findOne(String serial);
}
