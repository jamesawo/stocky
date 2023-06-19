/*
 * @Author: james.junior
 * @Date: 6/18/23 22:55
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.company.data.repository.CompanyEmployeeNokDetailRepository;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyEmployeeNokDetail;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyEmployeeNokDetailUsecase;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@Usecase
@RequiredArgsConstructor
public class CompanyEmployeeNokDetailUsecaseImpl implements ICompanyEmployeeNokDetailUsecase {
	private final CompanyEmployeeNokDetailRepository repository;

	@Override
	public CompanyEmployeeNokDetail save(CompanyEmployeeNokDetail detail) {
		return this.repository.save(detail);
	}

	@Override
	public Optional<CompanyEmployeeNokDetail> findOne(Long id) {
		return this.repository.findById(id);
	}
}
