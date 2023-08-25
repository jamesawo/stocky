package com.jamesaworo.stocky.features.authentication.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.features.authentication.data.interactor.contract.IAccountInteractor;
import com.jamesaworo.stocky.features.authentication.data.request.AccountRequest;
import com.jamesaworo.stocky.features.authentication.data.request.RoleRequest;
import com.jamesaworo.stocky.features.authentication.domain.entity.User;
import com.jamesaworo.stocky.features.company.data.request.CompanyEmployeeSearchRequest;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyEmployee;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyEmployeeUsecase;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.stream.Collectors;

import static com.jamesaworo.stocky.core.params.PageParam.toPageSearchResult;
import static com.jamesaworo.stocky.features.company.data.request.specification.CompanyEmployeeSearchSpecification.companyEmployeeSpecification;
import static org.springframework.http.ResponseEntity.ok;

@Interactor
@RequiredArgsConstructor
public class AccountInteractorImpl implements IAccountInteractor {

    private final ICompanyEmployeeUsecase employeeUsecase;

    @Override
    public ResponseEntity<PageSearchResult<List<AccountRequest>>> search(PageSearchRequest<CompanyEmployeeSearchRequest> request) {
        Page<CompanyEmployee> page = this.employeeUsecase.findMany(companyEmployeeSpecification(request.getSearchRequest()), request.getPage().toPageable());
        List<AccountRequest> requests = page.getContent().stream().map(this::mapEmployeeToAccountRequest).collect(Collectors.toList());
        return ok().body(toPageSearchResult(requests, page));
    }

    private AccountRequest mapEmployeeToAccountRequest(CompanyEmployee employee) {
        User user = employee.getAccountDetail();

        AccountRequest request = new AccountRequest();
        request.setEmployeeId(employee.getId());
        request.setUserId(user.getId());
        request.setName(employee.getPersonalDetail().getEmployeeFullName());
        request.setUsername(user.getUsername());
        request.setRoles(user.getRoles().stream().map(RoleRequest::toPartialRequest).collect(Collectors.toList()));
        request.setPhone(employee.getPersonalDetail().getEmployeePhone());
        request.setIsActiveStatus(user.getIsActiveStatus());
        return request;
    }

}
