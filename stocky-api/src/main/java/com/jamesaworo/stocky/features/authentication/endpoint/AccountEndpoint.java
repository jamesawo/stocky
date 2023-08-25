/*
 * @Author: james.junior
 * @Date: 8/24/23 18:14
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.authentication.endpoint;

import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.features.authentication.data.interactor.contract.IAccountInteractor;
import com.jamesaworo.stocky.features.authentication.data.request.AccountRequest;
import com.jamesaworo.stocky.features.company.data.request.CompanyEmployeeSearchRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;

@RestController
@RequestMapping(value = API_PREFIX + "/auth/account")
@RequiredArgsConstructor
public class AccountEndpoint {

    private final IAccountInteractor interactor;

    @PostMapping(value = "/search")
    public ResponseEntity<PageSearchResult<List<AccountRequest>>> create(@RequestBody PageSearchRequest<CompanyEmployeeSearchRequest> request) {
        return this.interactor.search(request);
    }

}
