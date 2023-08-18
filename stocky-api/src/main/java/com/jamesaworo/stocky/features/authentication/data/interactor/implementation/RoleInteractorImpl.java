package com.jamesaworo.stocky.features.authentication.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.features.authentication.data.interactor.contract.IRoleInteractor;
import com.jamesaworo.stocky.features.authentication.data.request.PermissionRequest;
import com.jamesaworo.stocky.features.authentication.data.request.RoleRequest;
import com.jamesaworo.stocky.features.authentication.domain.entity.Permission;
import com.jamesaworo.stocky.features.authentication.domain.entity.Role;
import com.jamesaworo.stocky.features.authentication.domain.usecase.IRoleUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static org.springframework.http.ResponseEntity.ok;

@Interactor
@RequiredArgsConstructor
public class RoleInteractorImpl implements IRoleInteractor, Mapper<RoleRequest, Role> {
    private final IRoleUsecase usecase;
    private final ModelMapper mapper;

    @Override
    public RoleRequest toRequest(Role model) {
        return this.mapper.map(model, RoleRequest.class);
    }

    @Override
    public Role toModel(RoleRequest request) {
        return this.mapper.map(request, Role.class);
    }

    @Override
    public ResponseEntity<RoleRequest> create(RoleRequest request) {
        Role role = this.usecase.save(this.toModel(request));
        return ok().body(toRequest(role));
    }

    @Override
    public ResponseEntity<List<RoleRequest>> getAll() {
        List<Role> roles = this.usecase.getAll();
        List<RoleRequest> requests = roles.stream()
                .filter(this.usecase::isNotSystemRole).map(this::toRequest).collect(Collectors.toList());
        return ok().body(requests);
    }

    @Override
    public ResponseEntity<Optional<RoleRequest>> getOne(Long id) {
        Optional<Role> optional = this.usecase.getOne(id);
        return ok().body(optional.map(this::toRequest));
    }

    @Override
    public ResponseEntity<List<PermissionRequest>> getRolePermissions(Long id) {
        Set<Permission> permissions = this.usecase.getRolePermissions(id);
        List<PermissionRequest> permissionRequests = permissions.stream().map(this::toPermissionRequest).collect(Collectors.toList());
        return ok().body(permissionRequests);
    }

    @Override
    public ResponseEntity<Optional<RoleRequest>> update(RoleRequest request) {
        Role model = toModel(request);
        Optional<Role> optional = this.usecase.update(model);
        return ok().body(optional.map(this::toRequest));
    }

    @Override
    public ResponseEntity<Optional<Boolean>> updateActiveStatus(Long id) {
        return ok().body(this.usecase.updateActiveStatus(id));
    }

    private PermissionRequest toPermissionRequest(Permission permission) {
        return this.mapper.map(permission, PermissionRequest.class);
    }
}
