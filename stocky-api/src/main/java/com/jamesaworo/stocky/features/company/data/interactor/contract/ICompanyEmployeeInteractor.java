package com.jamesaworo.stocky.features.company.data.interactor.contract;

import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.features.company.data.request.CompanyCustomerSearchRequest;
import com.jamesaworo.stocky.features.company.data.request.CompanyEmployeeRequest;
import com.jamesaworo.stocky.features.company.data.request.CompanyEmployeeSearchRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface ICompanyEmployeeInteractor {

	ResponseEntity<PageSearchResult<List<CompanyEmployeeRequest>>> search(PageSearchRequest<CompanyEmployeeSearchRequest> request);

	ResponseEntity<CompanyEmployeeRequest> save(CompanyEmployeeRequest customer);

	ResponseEntity<Optional<Boolean>> update(CompanyEmployeeRequest customer);

	ResponseEntity<Optional<Boolean>> toggleActiveStatus(Long id);
}
