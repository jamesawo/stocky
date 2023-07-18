package com.jamesaworo.stocky.features.company.data.interactor.contract;

import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.features.company.data.request.CompanyCustomerRequest;
import com.jamesaworo.stocky.features.company.data.request.CompanyCustomerSearchRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface ICompanyCustomerInteractor {

    ResponseEntity<PageSearchResult<List<CompanyCustomerRequest>>> search(PageSearchRequest<CompanyCustomerSearchRequest> request);

    List<CompanyCustomerRequest> search(String term);

    ResponseEntity<CompanyCustomerRequest> save(CompanyCustomerRequest customer);

    ResponseEntity<Optional<Boolean>> update(CompanyCustomerRequest customer);

    ResponseEntity<Optional<Boolean>> toggleActiveStatus(Long id);
}
