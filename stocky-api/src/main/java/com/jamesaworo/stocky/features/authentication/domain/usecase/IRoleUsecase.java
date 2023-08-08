package com.jamesaworo.stocky.features.authentication.domain.usecase;

import com.jamesaworo.stocky.features.authentication.domain.entity.Permission;
import com.jamesaworo.stocky.features.authentication.domain.entity.Role;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface IRoleUsecase {

    Role save(Role role);

    List<Role> getAll();

    boolean isNotSystemRole(Role role);

    Optional<Role> getOne(Long id);

    Set<Permission> getRolePermissions(Long id);

    Optional<Role> update(Role role);

    Optional<Boolean> updateActiveStatus(Long id);
}
