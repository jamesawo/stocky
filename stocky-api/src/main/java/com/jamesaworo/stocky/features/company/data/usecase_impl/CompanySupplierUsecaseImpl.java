/*
 * @Author: james.junior
 * @Date: 6/18/23 13:54
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.company.data.repository.CompanySupplierRepository;
import com.jamesaworo.stocky.features.company.domain.entity.CompanySupplier;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanySupplierUsecase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

import static java.util.Optional.of;

@Usecase
@RequiredArgsConstructor
@Slf4j
public class CompanySupplierUsecaseImpl implements ICompanySupplierUsecase {
	private final CompanySupplierRepository repository;

	public Optional<CompanySupplier> findOne(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public CompanySupplier save(CompanySupplier supplier) {
		return this.repository.save(supplier);
	}

	@Override
	public List<CompanySupplier> findMany(Specification<CompanySupplier> specification) {
		return this.repository.findAll(specification);
	}

	@Override
	public Page<CompanySupplier> findMany(Specification<CompanySupplier> specification, Pageable pageable) {
		return this.repository.findAll(specification, pageable);
	}

	@Override
	public Optional<Boolean> update(CompanySupplier supplier) {
		try {
			Optional<CompanySupplier> optional = this.findOne(supplier.getId());
			return optional.map(value -> {
				this.save(supplier);
				return Boolean.TRUE;
			});

		} catch (Exception e) {
			log.error(e.getMessage(), e);
			return of(Boolean.FALSE);
		}
	}

	@Override
	public Optional<Boolean> toggleActiveStatus(Long id) {
		Optional<CompanySupplier> optionalCustomer = this.findOne(id);
		return optionalCustomer.map(this::updateCustomerIsActiveStatus);
	}

	private Boolean updateCustomerIsActiveStatus(CompanySupplier supplier) {
		int count = this.repository.updateIsActiveStatus(!supplier.getIsActiveStatus(), supplier.getId());
		return count == 1;
	}
}
