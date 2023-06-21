package com.jamesaworo.stocky.features.company.data.interactor.contract;

import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.features.company.data.request.CompanySupplierRequest;
import com.jamesaworo.stocky.features.company.data.request.CompanySupplierSearchRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface ICompanySupplierInteractor {

	ResponseEntity<List<CompanySupplierRequest>> search(String term);

	ResponseEntity<PageSearchResult<List<CompanySupplierRequest>>> search(PageSearchRequest<CompanySupplierSearchRequest> request);

	ResponseEntity<CompanySupplierRequest> save(CompanySupplierRequest customer);

	ResponseEntity<Optional<Boolean>> update(CompanySupplierRequest customer);

	ResponseEntity<Optional<Boolean>> toggleActiveStatus(Long id);


}
