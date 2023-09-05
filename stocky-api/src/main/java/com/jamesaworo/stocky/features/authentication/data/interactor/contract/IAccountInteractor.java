package com.jamesaworo.stocky.features.authentication.data.interactor.contract;

import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.features.authentication.data.request.AccountRequest;
import com.jamesaworo.stocky.features.company.data.request.CompanyEmployeeSearchRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IAccountInteractor {
    ResponseEntity<PageSearchResult<List<AccountRequest>>> search(PageSearchRequest<CompanyEmployeeSearchRequest> request);

    ResponseEntity<Boolean> updateExpiryDate(Long userId, AccountRequest expiryDate);

    ResponseEntity<Boolean> updateRoles(Long userId, AccountRequest request);

    ResponseEntity<Boolean> updatePassword(Long userId, AccountRequest request);

    ResponseEntity<Boolean> toggleStatus(Long userId);
}
