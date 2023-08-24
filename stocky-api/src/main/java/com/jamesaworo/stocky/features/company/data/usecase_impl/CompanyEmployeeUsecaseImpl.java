/*
 * @Author: james.junior
 * @Date: 6/18/23 13:54
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.company.data.repository.CompanyEmployeeRepository;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyEmployee;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyEmployeeNokDetailUsecase;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyEmployeePersonalDetailUsecase;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyEmployeeUsecase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Usecase
@RequiredArgsConstructor
@Slf4j
public class CompanyEmployeeUsecaseImpl implements ICompanyEmployeeUsecase {
    private final CompanyEmployeeRepository repository;
    private final ICompanyEmployeePersonalDetailUsecase personalDetailUsecase;
    private final ICompanyEmployeeNokDetailUsecase nokDetailUsecase;


    @Override
    public Optional<CompanyEmployee> findOne(Long id) {
        return this.repository.findById(id);
    }

    @Override
    public CompanyEmployee save(CompanyEmployee customer) {
        return this.repository.save(customer);
    }

    @Override
    public List<CompanyEmployee> findMany(Specification<CompanyEmployee> specification) {
        return this.repository.findAll(specification);
    }

    @Override
    public Page<CompanyEmployee> findMany(Specification<CompanyEmployee> specification, Pageable pageable) {
        return this.repository.findAll(specification, pageable);
    }

    @Override
    public Optional<Boolean> update(CompanyEmployee customer) {
        try {
            Optional<CompanyEmployee> optionalCustomer = this.findOne(customer.getId());
            return optionalCustomer.map(value -> {
                this.setEmployeeRecordBeforeUpdate(value, customer);
                this.save(customer);
                return Boolean.TRUE;
            });
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    private void setEmployeeRecordBeforeUpdate(CompanyEmployee existingEmployee, CompanyEmployee updatingEmployee) {
        updatingEmployee.setId(existingEmployee.getId());
        updatingEmployee.getAccountDetail().setId(existingEmployee.getAccountDetail().getId());

        updatingEmployee.getPersonalDetail().setId(existingEmployee.getPersonalDetail().getId());
        this.personalDetailUsecase.save(updatingEmployee.getPersonalDetail());

        updatingEmployee.getNokDetail().setId(existingEmployee.getNokDetail().getId());
        this.nokDetailUsecase.save(updatingEmployee.getNokDetail());

        updatingEmployee.setIsActiveStatus(existingEmployee.getIsActiveStatus());
    }


    @Override
    public Optional<Boolean> toggleActiveStatus(Long id) {
        Optional<CompanyEmployee> optionalCustomer = this.findOne(id);
        return optionalCustomer.map(this::updateCustomerIsActiveStatus);

    }

    private Boolean updateCustomerIsActiveStatus(CompanyEmployee customer) {
        int count = this.repository.updateIsActiveStatus(!customer.getIsActiveStatus(), customer.getId());
        return count == 1;
    }
}
