/*
 * @Author: james.junior
 * @Date: 6/18/23 15:40
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.endpoint;

import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.features.company.data.interactor.contract.ICompanyEmployeeInteractor;
import com.jamesaworo.stocky.features.company.data.request.CompanyEmployeeRequest;
import com.jamesaworo.stocky.features.company.data.request.CompanyEmployeeSearchRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;


@RestController
@RequestMapping(value = API_PREFIX + "/company/employee")
@RequiredArgsConstructor
public class CompanyEmployeeEndpoint {

    private final ICompanyEmployeeInteractor interactor;


    @PostMapping(value = "/search")
    public ResponseEntity<PageSearchResult<List<CompanyEmployeeRequest>>> search(
            @RequestBody PageSearchRequest<CompanyEmployeeSearchRequest> request
    ) {
        return this.interactor.search(request);
    }

    @PostMapping(value = "/create")
    public ResponseEntity<CompanyEmployeeRequest> save(@RequestBody CompanyEmployeeRequest request) {
        return this.interactor.save(request);
    }

    @PostMapping(value = "/update")
    public ResponseEntity<Optional<Boolean>> update(@RequestBody CompanyEmployeeRequest request) {
        return this.interactor.update(request);
    }

    @PutMapping(value = "/status/{id}")
    public ResponseEntity<Optional<Boolean>> toggleActiveStatus(@PathVariable(value = "id") Long id) {
        return this.interactor.toggleActiveStatus(id);
    }
}
