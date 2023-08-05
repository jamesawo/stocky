package com.jamesaworo.stocky.features.sale.data.repository;

import com.jamesaworo.stocky.features.sale.domain.entity.SaleTransaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SaleTransactionRepository extends JpaRepository<SaleTransaction, Long>, JpaSpecificationExecutor<SaleTransaction> {

    Page<SaleTransaction> findAll(Specification<SaleTransaction> specification, Pageable pageable);

    List<SaleTransaction> findAll(Specification<SaleTransaction> specification);

    Optional<SaleTransaction> findByReferenceEqualsAndSerialEquals(String reference, String token);

    Optional<SaleTransaction> findBySerialEqualsIgnoreCase(String token);
}
