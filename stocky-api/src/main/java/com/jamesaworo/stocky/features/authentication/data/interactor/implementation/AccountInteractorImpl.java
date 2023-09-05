package com.jamesaworo.stocky.features.authentication.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.core.utils.Util;
import com.jamesaworo.stocky.features.authentication.data.interactor.contract.IAccountInteractor;
import com.jamesaworo.stocky.features.authentication.data.request.AccountRequest;
import com.jamesaworo.stocky.features.authentication.data.request.RoleRequest;
import com.jamesaworo.stocky.features.authentication.domain.entity.User;
import com.jamesaworo.stocky.features.authentication.domain.usecase.IUserUsecase;
import com.jamesaworo.stocky.features.company.data.request.CompanyEmployeeSearchRequest;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyEmployee;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyEmployeeUsecase;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.jamesaworo.stocky.core.params.PageParam.toPageSearchResult;
import static com.jamesaworo.stocky.core.utils.Util.parseToLocalDate;
import static com.jamesaworo.stocky.features.company.data.request.specification.CompanyEmployeeSearchSpecification.companyEmployeeSpecification;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.util.ObjectUtils.isEmpty;

@Interactor
@RequiredArgsConstructor
public class AccountInteractorImpl implements IAccountInteractor {

    private final ICompanyEmployeeUsecase employeeUsecase;
    private final IUserUsecase userUsecase;

    @Override
    public ResponseEntity<PageSearchResult<List<AccountRequest>>> search(PageSearchRequest<CompanyEmployeeSearchRequest> request) {
        Page<CompanyEmployee> page = this.employeeUsecase.findMany(companyEmployeeSpecification(request.getSearchRequest()), request.getPage().toPageable());
        List<AccountRequest> requests = page.getContent().stream().map(this::mapEmployeeToAccountRequest).collect(Collectors.toList());
        return ok().body(toPageSearchResult(requests, page));
    }

    @Override
    public ResponseEntity<Boolean> updateExpiryDate(Long userId, AccountRequest request) {
        if (!isEmpty(request.getExpiryDate())) {
            Boolean updated = this.userUsecase.updateExpiryDate(userId, parseToLocalDate(request.getExpiryDate()));
            return ok().body(updated);
        }
        return ok().body(false);
    }

    @Override
    public ResponseEntity<Boolean> updateRoles(Long userId, AccountRequest request) {
        if (!isEmpty(request.getRoles())) {
            List<Long> rolesId = request.getRoles().stream().map(RoleRequest::getId).collect(Collectors.toList());
            Boolean updated = this.userUsecase.updateRoles(userId, rolesId);
            return ok().body(updated);
        }
        return ok().body(false);
    }

    @Override
    public ResponseEntity<Boolean> updatePassword(Long userId, AccountRequest request) {
        if (!isEmpty(request.getPassword())) {
            Boolean updated = this.userUsecase.updatePassword(userId, request.getPassword());
            return ok().body(updated);
        }
        return ok().body(false);
    }

    @Override
    public ResponseEntity<Boolean> toggleStatus(Long userId) {
        Optional<Boolean> optional = this.userUsecase.toggleActiveStatus(userId);
        return ok().body(optional.orElse(false));
    }

    private AccountRequest mapEmployeeToAccountRequest(CompanyEmployee employee) {
        User user = employee.getAccountDetail();

        AccountRequest request = new AccountRequest();
        request.setId(user.getId());
        request.setEmployeeId(employee.getId());
        request.setUserId(user.getId());
        request.setName(employee.getPersonalDetail().getEmployeeFullName());
        request.setUsername(user.getUsername());
        request.setRoles(user.getRoles().stream().map(RoleRequest::toPartialRequest).collect(Collectors.toList()));
        request.setPhone(employee.getPersonalDetail().getEmployeePhone());
        request.setIsActiveStatus(user.getIsActiveStatus());
        request.setExpiryDate(Util.formatDate(user.getExpirationDate()));
        return request;
    }

}
