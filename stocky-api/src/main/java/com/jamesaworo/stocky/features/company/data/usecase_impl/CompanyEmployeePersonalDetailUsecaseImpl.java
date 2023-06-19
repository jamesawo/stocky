/*
 * @Author: james.junior
 * @Date: 6/18/23 22:55
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.company.data.repository.CompanyEmployeePersonalDetailRepository;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyEmployeePersonalDetail;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyEmployeePersonalDetailUsecase;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@Usecase
@RequiredArgsConstructor
public class CompanyEmployeePersonalDetailUsecaseImpl implements ICompanyEmployeePersonalDetailUsecase {
	private final CompanyEmployeePersonalDetailRepository repository;

	@Override
	public CompanyEmployeePersonalDetail save(CompanyEmployeePersonalDetail detail) {
		return this.repository.save(detail);
	}

	@Override
	public Optional<CompanyEmployeePersonalDetail> findOne(Long id) {
		return this.repository.findById(id);
	}
}
