/*
 * @Author: james.junior
 * @Date: 6/13/23 17:39
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.authentication.endpoint;

import com.jamesaworo.stocky.features.authentication.data.interactor.contract.IPermissionInteractor;
import com.jamesaworo.stocky.features.authentication.data.request.PermissionGroupRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;

@RestController
@RequestMapping(value = API_PREFIX + "/auth/permission")
@RequiredArgsConstructor
public class PermissionsEndpoint {
    private final IPermissionInteractor interactor;

    @GetMapping(value = "/all")
    ResponseEntity<List<PermissionGroupRequest>> getAllPermissionsGroupedByModule() {
        return interactor.getAllGroupedByModule();
    }

}
