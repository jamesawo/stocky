package com.jamesaworo.stocky.features.authentication.data.interactor.contract;

import com.jamesaworo.stocky.features.authentication.data.request.PermissionRequest;
import com.jamesaworo.stocky.features.authentication.data.request.RoleRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface IRoleInteractor {

	ResponseEntity<RoleRequest> create(RoleRequest request);

	ResponseEntity<List<RoleRequest>> getAll();

	ResponseEntity<Optional<RoleRequest>> getOne(Long id);

	ResponseEntity<List<PermissionRequest>> getRolePermissions(Long id);

	ResponseEntity<Optional<RoleRequest>> update(RoleRequest request);

	ResponseEntity<Optional<Boolean>> updateActiveStatus(Long id);
}
