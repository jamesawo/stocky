package com.jamesaworo.stocky.features.company.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.company.data.repository.CompanyExpensesRepository;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyExpenses;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyExpensesUsecase;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

/**
 * @author Aworo James
 * @since 5/10/23
 */
@Usecase
@RequiredArgsConstructor
public class CompanyExpensesUsecaseImpl implements ICompanyExpensesUsecase {

	private final CompanyExpensesRepository repository;

	@Override
	public Optional<CompanyExpenses> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public CompanyExpenses save(CompanyExpenses model) {
		return this.repository.save(model);
	}


	@Override
	public Page<CompanyExpenses> findMany(Specification<CompanyExpenses> specification, Pageable pageable) {
		return this.repository.findAll(specification, pageable);
	}

	@Override
	public List<CompanyExpenses> findMany(Specification<CompanyExpenses> specification) {
		return this.repository.findAll(specification);
	}
}