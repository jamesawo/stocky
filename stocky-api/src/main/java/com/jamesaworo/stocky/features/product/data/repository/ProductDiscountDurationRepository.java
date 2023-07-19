package com.jamesaworo.stocky.features.product.data.repository;

import com.jamesaworo.stocky.features.product.domain.entity.ProductDiscountDuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductDiscountDurationRepository extends JpaRepository<ProductDiscountDuration, Long> {

    Optional<ProductDiscountDuration> findProductDiscountDurationByPriceId(Long price);
}
