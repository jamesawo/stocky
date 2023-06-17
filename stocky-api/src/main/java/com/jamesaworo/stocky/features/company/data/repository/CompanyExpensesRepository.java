package com.jamesaworo.stocky.features.company.data.repository;

import com.jamesaworo.stocky.features.company.domain.entity.CompanyExpenses;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface CompanyExpensesRepository extends JpaRepository<CompanyExpenses, Long>, JpaSpecificationExecutor<CompanyExpenses> {
	Page<CompanyExpenses> findAll(Specification<CompanyExpenses> specification, Pageable pageable);

	List<CompanyExpenses> findAll(Specification<CompanyExpenses> specification);
}
