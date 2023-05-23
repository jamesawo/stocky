package com.jamesaworo.stocky.features.product.data.repository;

import com.jamesaworo.stocky.features.product.domain.entity.ProductTax;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductTaxRepository extends JpaRepository<ProductTax, Long> {
	Optional<ProductTax> findByTitleEqualsIgnoreCaseAndPercent(String title, Double percent);
}
