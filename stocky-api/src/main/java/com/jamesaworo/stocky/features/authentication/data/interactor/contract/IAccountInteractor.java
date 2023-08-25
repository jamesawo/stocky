package com.jamesaworo.stocky.features.authentication.data.interactor.contract;

import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.features.authentication.data.request.AccountRequest;
import com.jamesaworo.stocky.features.company.data.request.CompanyEmployeeSearchRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IAccountInteractor {
    ResponseEntity<PageSearchResult<List<AccountRequest>>> search(PageSearchRequest<CompanyEmployeeSearchRequest> request);
}
