package com.jamesaworo.stocky.features.company.domain.usecase;

import com.jamesaworo.stocky.features.company.domain.entity.CompanyLocation;

import java.util.List;
import java.util.Optional;

public interface ICompanyLocationUsecase {
	List<CompanyLocation> findAll();

	Optional<CompanyLocation> save(CompanyLocation model);

	Boolean disable(Long id);

	Boolean enable(Long id);

	Optional<CompanyLocation> findOne(Long id);

	Boolean toggleStatus(boolean status, Long id);
}
