package com.jamesaworo.stocky.features.company.domain.usecase;

import com.jamesaworo.stocky.features.company.domain.entity.CompanyCustomer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

public interface ICompanyCustomerUsecase {
    CompanyCustomer save(CompanyCustomer customer);

    List<CompanyCustomer> findMany(Specification<CompanyCustomer> specification);

    Page<CompanyCustomer> findMany(Specification<CompanyCustomer> specification, Pageable pageable);

    Optional<Boolean> update(CompanyCustomer customer);

    Optional<Boolean> toggleActiveStatus(Long id);

    Optional<CompanyCustomer> findOne(Long id);
}
