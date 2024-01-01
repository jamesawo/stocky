/*
 * @Author: james.junior
 * @Date: 6/18/23 14:19
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.features.company.data.interactor.contract.ICompanyCustomerInteractor;
import com.jamesaworo.stocky.features.company.data.request.CompanyCustomerRequest;
import com.jamesaworo.stocky.features.company.data.request.CompanyCustomerSearchRequest;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyCustomer;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyCustomerUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static com.jamesaworo.stocky.core.params.PageParam.toPageSearchResult;
import static com.jamesaworo.stocky.features.company.data.request.specification.CompanyCustomerSearchSpecification.companyCustomerSpecification;
import static org.springframework.http.ResponseEntity.ok;

@Interactor
@RequiredArgsConstructor
public class CompanyCustomerInteractorImpl implements ICompanyCustomerInteractor, Mapper<CompanyCustomerRequest, CompanyCustomer> {
    private final ICompanyCustomerUsecase usecase;
    private final ModelMapper modelMapper;

    @Override
    public CompanyCustomerRequest toRequest(CompanyCustomer model) {
        return this.modelMapper.map(model, CompanyCustomerRequest.class);
    }

    @Override
    public CompanyCustomer toModel(CompanyCustomerRequest request) {
        return this.modelMapper.map(request, CompanyCustomer.class);
    }

    @Override
    public ResponseEntity<PageSearchResult<List<CompanyCustomerRequest>>> search(PageSearchRequest<CompanyCustomerSearchRequest> request) {
        Page<CompanyCustomer> page = this.usecase.findMany(
                companyCustomerSpecification(request.getSearchRequest()),
                request.getPage().toPageable()
        );
        Set<CompanyCustomer> customers = new HashSet<>(page.getContent());
        List<CompanyCustomerRequest> requests = customers.stream().map(this::toRequest).collect(Collectors.toList());
        return ok().body(toPageSearchResult(requests, page));
    }

    @Override
    public List<CompanyCustomerRequest> search(String term) {
        List<CompanyCustomer> customerList = this.usecase.findMany(companyCustomerSpecification(term));
        Set<CompanyCustomer> customers = new HashSet<>(customerList);
        return customers.stream().map(this::toRequest).collect(Collectors.toList());
    }

    @Override
    public ResponseEntity<CompanyCustomerRequest> save(CompanyCustomerRequest customer) {
        CompanyCustomer savedCustomer = this.usecase.save(toModel(customer));
        return ok().body(toRequest(savedCustomer));
    }

    @Override
    public ResponseEntity<Optional<Boolean>> update(CompanyCustomerRequest customer) {
        Optional<Boolean> optionalBoolean = this.usecase.update(toModel(customer));
        return ok().body(optionalBoolean);
    }

    @Override
    public ResponseEntity<Optional<Boolean>> toggleActiveStatus(Long id) {
        Optional<Boolean> optional = this.usecase.toggleActiveStatus(id);
        return ok().body(optional);
    }
}
