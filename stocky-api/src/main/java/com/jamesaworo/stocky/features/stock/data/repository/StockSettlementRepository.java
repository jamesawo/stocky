/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.data.repository;

import com.jamesaworo.stocky.features.stock.domain.entity.StockSettlement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface StockSettlementRepository extends JpaRepository<StockSettlement, Long> {
}
