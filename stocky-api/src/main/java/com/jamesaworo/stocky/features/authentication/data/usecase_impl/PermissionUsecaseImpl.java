/*
 * @Author: james.junior
 * @Date: 6/13/23 11:47
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.authentication.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.authentication.data.repository.PermissionRepository;
import com.jamesaworo.stocky.features.authentication.domain.entity.Permission;
import com.jamesaworo.stocky.features.authentication.domain.usecase.IPermissionUsecase;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.LongStream;

@Usecase
@RequiredArgsConstructor
public class PermissionUsecaseImpl implements IPermissionUsecase {
    private final PermissionRepository repository;

    @Override
    public List<Permission> getAll() {
        return this.repository.findAll();
    }

    @Override
    public Optional<Permission> getById(Long id) {
        return this.repository.findById(id);
    }

    @Override
    public Collection<Permission> getPermissionsByIds(LongStream list) {
        List<Permission> permissions = new ArrayList<>();
        list.forEach(id -> this.getById(id).ifPresent(permissions::add));
        return permissions;
    }

}
