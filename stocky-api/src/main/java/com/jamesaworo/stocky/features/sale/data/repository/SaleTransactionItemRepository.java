package com.jamesaworo.stocky.features.sale.data.repository;

import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransactionItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleTransactionItemRepository extends JpaRepository<SaleTransactionItem, Long> {
}
