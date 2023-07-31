/*
 * @Author: james.junior
 * @Date: 5/22/23 01:08
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.endpoint;

import com.jamesaworo.stocky.core.request.CommonRequest;
import com.jamesaworo.stocky.features.company.data.interactor.contract.ICompanyPaymentOptionInteractor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;
import static java.lang.Boolean.parseBoolean;

@RestController
@RequestMapping(value = API_PREFIX + "/company/payment-option/")
@RequiredArgsConstructor
public class CompanyPaymentOptionEndpoint {

    private final ICompanyPaymentOptionInteractor interactor;

    @GetMapping(value = "get/{id}")
    public ResponseEntity<Optional<CommonRequest>> find(@PathVariable Long id) {
        return this.interactor.find(id);
    }

    @GetMapping("all")
    public ResponseEntity<List<CommonRequest>> findMany(
            @RequestParam(value = "filterIsActive") String filterIsActive
    ) {
        return this.interactor.findAll(parseBoolean(filterIsActive));
    }

    @PostMapping("create")
    public ResponseEntity<Optional<CommonRequest>> save(
            @RequestBody @Valid CommonRequest dto
    ) {
        return this.interactor.save(dto);
    }

    @PutMapping("update")
    public ResponseEntity<Optional<CommonRequest>> update(
            @RequestBody @Valid CommonRequest request
    ) {
        return this.interactor.update(request);
    }

    @PutMapping("status/{id}")
    public ResponseEntity<Optional<Boolean>> toggleIsActiveStatus(@PathVariable Long id) {
        return this.interactor.toggleActiveStatus(id);
    }


}
