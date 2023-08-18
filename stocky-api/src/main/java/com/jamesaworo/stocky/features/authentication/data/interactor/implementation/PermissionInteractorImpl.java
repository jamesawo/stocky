/*
 * @Author: james.junior
 * @Date: 6/13/23 17:48
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.authentication.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.features.authentication.data.interactor.contract.IPermissionInteractor;
import com.jamesaworo.stocky.features.authentication.data.request.PermissionGroupRequest;
import com.jamesaworo.stocky.features.authentication.data.request.PermissionRequest;
import com.jamesaworo.stocky.features.authentication.domain.entity.Permission;
import com.jamesaworo.stocky.features.authentication.domain.usecase.IPermissionUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.http.ResponseEntity.ok;

@Interactor
@RequiredArgsConstructor
public class PermissionInteractorImpl implements IPermissionInteractor, Mapper<PermissionRequest, Permission> {
    private final IPermissionUsecase usecase;
    private final ModelMapper mapper;


    @Override
    public ResponseEntity<List<PermissionRequest>> getAll() {
        List<Permission> permissions = this.usecase.getAll();
        return ok().body(permissions.stream().map(this::toRequest).collect(Collectors.toList()));
    }

    @Override
    public ResponseEntity<Optional<PermissionRequest>> getOne(Long id) {
        Optional<Permission> optional = this.usecase.getById(id);
        return ok().body(optional.map(this::toRequest));
    }

    @Override
    public PermissionRequest toRequest(Permission model) {
        return this.mapper.map(model, PermissionRequest.class);
    }

    @Override
    public Permission toModel(PermissionRequest request) {
        return this.mapper.map(request, Permission.class);
    }

    @Override
    public ResponseEntity<List<PermissionGroupRequest>> getAllGroupedByModule() {
        List<Permission> permissions = this.usecase.getAll();
        List<PermissionGroupRequest> collect = permissions.stream()
                .map(this::toRequest)
                .collect(Collectors.groupingBy(PermissionRequest::getModule))
                .entrySet()
                .stream()
                .map(entry -> new PermissionGroupRequest(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
        return ok().body(collect);
    }
}
