package com.jamesaworo.stocky.features.company.domain.usecase;

import com.jamesaworo.stocky.features.company.domain.entity.CompanyExpenses;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

/**
 * @author Aworo James
 * @since 5/10/23
 */
public interface ICompanyExpensesUsecase {

	Optional<CompanyExpenses> findById(Long id);

	CompanyExpenses save(CompanyExpenses model);

	Page<CompanyExpenses> findMany(Specification<CompanyExpenses> specification, Pageable pageable);

	List<CompanyExpenses> findMany(Specification<CompanyExpenses> specification);

}