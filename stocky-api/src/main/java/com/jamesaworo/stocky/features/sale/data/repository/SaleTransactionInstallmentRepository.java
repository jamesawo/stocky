package com.jamesaworo.stocky.features.sale.data.repository;

import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransactionInstallment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleTransactionInstallmentRepository extends JpaRepository<SaleTransactionInstallment, Long> {
}
