/*
 * @Author: james.junior
 * @Date: 6/15/23 00:44
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.company.data.repository.CompanyBusinessCategoryRepository;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyBusinessCategory;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyBusinessCategoryUsecase;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Usecase
@RequiredArgsConstructor
public class CompanyBusinessCategoryUsecaseImpl implements ICompanyBusinessCategoryUsecase {
	private final CompanyBusinessCategoryRepository repository;

	@Override
	public List<CompanyBusinessCategory> getAll() {
		return this.repository.findAll();
	}

	@Override
	public Optional<CompanyBusinessCategory> getOne(Long id) {
		return this.repository.findById(id);
	}
}
