/*
 * @Author: james.junior
 * @Date: 6/26/23 17:35
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.stock.domain.usecase;

import com.jamesaworo.stocky.features.stock.domain.entity.Stock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

public interface IStockUsecase {
	Stock save(Stock stock);

	Stock setCodeAndSave(Stock stock);

	Optional<Stock> findOne(Long id);

	Page<Stock> findMany(Specification<Stock> specification, Pageable pageable);

	List<Stock> findMany(Specification<Stock> specification);

}
