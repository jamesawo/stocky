/*
 * @Author: james.junior
 * @Date: 6/15/23 01:15
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.company.data.repository.CompanyBasicDetailRepository;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyBasicDetail;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanySetupUsecase;
import lombok.RequiredArgsConstructor;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Usecase
@RequiredArgsConstructor
public class CompanySetupUsecaseImpl implements ICompanySetupUsecase {

	private final CompanyBasicDetailRepository repository;

	@Override
	public List<CompanyBasicDetail> all() {
		return this.repository.findAll();
	}

	@Override
	public Optional<CompanyBasicDetail> get(String key) {
		return this.repository.findBySetupKeyEqualsIgnoreCase(key);
	}

	@Override
	public Optional<Boolean> update(String key, String value) {
		Optional<CompanyBasicDetail> optional = this.get(key);
		return optional.map(detail -> {
			int count = this.repository.updateValueWhereKey(value, key);
			return count == 1;
		});
	}

	@Override
	@Transactional
	public void updateMany(List<CompanyBasicDetail> list) {
		list.forEach(basicDetail -> {
			this.update(basicDetail.getSetupKey(), basicDetail.getSetupValue());
		});
	}
}
