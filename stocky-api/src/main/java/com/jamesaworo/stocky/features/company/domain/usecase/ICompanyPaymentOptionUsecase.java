package com.jamesaworo.stocky.features.company.domain.usecase;

import com.jamesaworo.stocky.features.company.domain.entity.CompanyPaymentOption;

import java.util.List;
import java.util.Optional;

public interface ICompanyPaymentOptionUsecase {
	List<CompanyPaymentOption> findAll();

	Optional<CompanyPaymentOption> save(CompanyPaymentOption model);

	Boolean disable(Long id);

	Boolean enable(Long id);

	Optional<CompanyPaymentOption> findOne(Long id);

	Boolean toggleStatus(boolean status, Long id);
}
