package com.jamesaworo.stocky.features.company.domain.usecase;

import com.jamesaworo.stocky.features.company.domain.entity.CompanyEmployee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

public interface ICompanyEmployeeUsecase {
    CompanyEmployee save(CompanyEmployee customer);

    List<CompanyEmployee> findMany(Specification<CompanyEmployee> specification);

    Page<CompanyEmployee> findMany(Specification<CompanyEmployee> specification, Pageable pageable);

    Optional<Boolean> update(CompanyEmployee customer);

    Optional<Boolean> toggleActiveStatus(Long id);

    Optional<CompanyEmployee> findOne(Long id);
}
