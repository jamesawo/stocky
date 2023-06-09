package com.jamesaworo.stocky.features.company.domain.usecase;

import com.jamesaworo.stocky.features.company.domain.entity.CompanyBasicDetail;

import java.util.List;
import java.util.Optional;

public interface ICompanySetupUsecase {

	List<CompanyBasicDetail> all();

	Optional<CompanyBasicDetail> get(String key);

	Optional<Boolean> update(String key, String value);

	void updateMany(List<CompanyBasicDetail> list);
}
