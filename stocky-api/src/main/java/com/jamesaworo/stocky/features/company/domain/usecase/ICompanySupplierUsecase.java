package com.jamesaworo.stocky.features.company.domain.usecase;

import com.jamesaworo.stocky.features.company.domain.entity.CompanySupplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

public interface ICompanySupplierUsecase {
	CompanySupplier save(CompanySupplier supplier);

	List<CompanySupplier> findMany(Specification<CompanySupplier> specification);

	Page<CompanySupplier> findMany(Specification<CompanySupplier> specification, Pageable pageable);

	Optional<Boolean> update(CompanySupplier supplier);

	Optional<Boolean> toggleActiveStatus(Long id);

	Optional<CompanySupplier> findOne(Long id);


}
