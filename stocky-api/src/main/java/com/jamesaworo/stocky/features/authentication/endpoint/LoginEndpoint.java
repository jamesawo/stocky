/*
 * @Author: james.junior
 * @Date: 8/6/23 02:31
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.authentication.endpoint;

import com.jamesaworo.stocky.features.authentication.data.interactor.contract.ILoginInteractor;
import com.jamesaworo.stocky.features.authentication.data.request.LoginRequest;
import com.jamesaworo.stocky.features.authentication.data.request.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;


@RestController
@RequestMapping(value = API_PREFIX + "/auth")
@RequiredArgsConstructor
public class LoginEndpoint {

    private final ILoginInteractor interactor;

    @PostMapping(value = "login")
    ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {
        return this.interactor.login(request);
    }
}
