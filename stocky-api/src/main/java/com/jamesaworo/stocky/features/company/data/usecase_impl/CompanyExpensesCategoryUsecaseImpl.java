/*
 * @Author: james.junior
 * @Date: 6/12/23 14:34
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.company.data.repository.CompanyExpensesCategoryRepository;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyExpensesCategory;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyExpensesCategoryUsecase;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Usecase
@RequiredArgsConstructor
public class CompanyExpensesCategoryUsecaseImpl implements ICompanyExpensesCategoryUsecase {
	private final CompanyExpensesCategoryRepository repository;

	@Override
	public CompanyExpensesCategory save(CompanyExpensesCategory category) {
		return this.repository.save(category);
	}

	@Override
	public List<CompanyExpensesCategory> findAll() {
		return this.repository.findAll();
	}

	@Override
	public Optional<CompanyExpensesCategory> findOne(Long id) {
		return this.repository.findById(id);
	}
}
