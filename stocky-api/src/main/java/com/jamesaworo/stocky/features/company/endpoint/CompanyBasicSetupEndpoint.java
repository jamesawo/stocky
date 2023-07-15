/*
 * @Author: james.junior
 * @Date: 6/15/23 00:59
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.endpoint;

import com.jamesaworo.stocky.features.company.data.interactor.contract.ICompanyBusinessCategoryInteractor;
import com.jamesaworo.stocky.features.company.data.interactor.contract.ICompanySetupInteractor;
import com.jamesaworo.stocky.features.company.data.request.CompanyBusinessCategoryRequest;
import com.jamesaworo.stocky.features.company.data.request.CompanyDetailRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;

@RestController
@RequestMapping(value = API_PREFIX + "/company/setup/basic")
@RequiredArgsConstructor
public class CompanyBasicSetupEndpoint {

    private final ICompanySetupInteractor interactor;
    private final ICompanyBusinessCategoryInteractor businessCategoryInteractor;

    @GetMapping(value = "get-business-categories")
    public ResponseEntity<List<CompanyBusinessCategoryRequest>> getAllBusinessCategories() {
        return this.businessCategoryInteractor.getAll();
    }

    @GetMapping(value = "get-all")
    public ResponseEntity<Map<String, String>> getAll() {
        return this.interactor.getAll();
    }

    @GetMapping(value = "get-one")
    public ResponseEntity<Optional<CompanyDetailRequest>> get(String key) {
        return this.interactor.get(key);
    }

    @PutMapping(value = "update-one")
    public ResponseEntity<Optional<Boolean>> update(@RequestBody CompanyDetailRequest request) {
        return this.interactor.update(request.getSetupKey(), request.getSetupValue());
    }

    @PostMapping(value = "update-many")
    public ResponseEntity<Optional<Boolean>> update(@RequestBody List<CompanyDetailRequest> requestList) {
        return this.interactor.updateMany(requestList);
    }
}
