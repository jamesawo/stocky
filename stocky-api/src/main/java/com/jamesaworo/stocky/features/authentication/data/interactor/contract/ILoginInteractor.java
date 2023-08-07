/*
 * @Author: james.junior
 * @Date: 8/6/23 02:33
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.authentication.data.interactor.contract;

import com.jamesaworo.stocky.features.authentication.data.request.LoginRequest;
import com.jamesaworo.stocky.features.authentication.data.request.LoginResponse;
import org.springframework.http.ResponseEntity;

public interface ILoginInteractor {
    ResponseEntity<LoginResponse> login(LoginRequest request);
}
