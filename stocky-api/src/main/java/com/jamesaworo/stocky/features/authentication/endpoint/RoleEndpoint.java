/*
 * @Author: james.junior
 * @Date: 6/13/23 17:39
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.authentication.endpoint;

import com.jamesaworo.stocky.features.authentication.data.interactor.contract.IRoleInteractor;
import com.jamesaworo.stocky.features.authentication.data.request.PermissionRequest;
import com.jamesaworo.stocky.features.authentication.data.request.RoleRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;

@RestController
@RequestMapping(value = API_PREFIX + "/auth/role")
@RequiredArgsConstructor
public class RoleEndpoint {
    private final IRoleInteractor interactor;

    @PostMapping(value = "/create")
    public ResponseEntity<RoleRequest> create(@RequestBody @Valid RoleRequest role) {
        return this.interactor.create(role);
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<RoleRequest>> getAll() {
        return this.interactor.getAll();
    }

    @GetMapping(value = "/find/{id}")
    public ResponseEntity<Optional<RoleRequest>> getOne(@PathVariable Long id) {
        return this.interactor.getOne(id);
    }

    @GetMapping(value = "/find-role-permission/{id}")
    public ResponseEntity<List<PermissionRequest>> getRolePermissions(@PathVariable Long id) {
        return this.interactor.getRolePermissions(id);
    }

    @PutMapping(value = "/update")
    public ResponseEntity<Optional<RoleRequest>> update(@RequestBody RoleRequest request) {
        if (ObjectUtils.isEmpty(request.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid role provided");
        }
        return this.interactor.update(request);
    }

    @PutMapping(value = "/status/{id}")
    public ResponseEntity<Optional<Boolean>> updateActiveStatus(@PathVariable Long id) {
        return this.interactor.updateActiveStatus(id);
    }
}
