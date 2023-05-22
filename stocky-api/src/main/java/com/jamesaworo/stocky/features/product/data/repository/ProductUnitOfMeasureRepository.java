package com.jamesaworo.stocky.features.product.data.repository;

import com.jamesaworo.stocky.features.product.domain.entity.ProductUnitOfMeasure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductUnitOfMeasureRepository extends JpaRepository<ProductUnitOfMeasure, Long> {
	Optional<ProductUnitOfMeasure> findByTypeEqualsIgnoreCaseAndUnitEqualsIgnoreCase(String type, String unit);
}
