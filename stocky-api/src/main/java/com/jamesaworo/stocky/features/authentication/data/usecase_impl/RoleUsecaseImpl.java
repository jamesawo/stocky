/*
 * @Author: james.junior
 * @Date: 6/13/23 11:24
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.authentication.data.usecase_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.authentication.data.repository.RoleRepository;
import com.jamesaworo.stocky.features.authentication.domain.entity.Permission;
import com.jamesaworo.stocky.features.authentication.domain.entity.Role;
import com.jamesaworo.stocky.features.authentication.domain.usecase.IPermissionUsecase;
import com.jamesaworo.stocky.features.authentication.domain.usecase.IRoleUsecase;
import lombok.RequiredArgsConstructor;

import java.util.*;
import java.util.stream.LongStream;

@Usecase
@RequiredArgsConstructor
public class RoleUsecaseImpl implements IRoleUsecase {
	private final RoleRepository repository;
	private final IPermissionUsecase usecase;

	@Override
	public Role save(Role role) {
		role.setPermissions(new HashSet<>(this.getPermissionsFromRole(role)));
		return this.repository.save(role);
	}

	@Override
	public List<Role> getAll() {
		return this.repository.findAll();
	}

	@Override
	public Optional<Role> getOne(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public Set<Permission> getRolePermissions(Long id) {
		Optional<Role> optional = this.getOne(id);
		return optional.map(Role::getPermissions).orElse(new HashSet<>());
	}

	@Override
	public Optional<Role> update(Role role) {
		Optional<Role> optional = this.getOne(role.getId());
		return optional.map(this::save);
	}

	@Override
	public Optional<Boolean> updateActiveStatus(Long id) {
		Optional<Role> optional = this.getOne(id);
		return optional.map(role -> this.updateRoleActiveStatus(role.getId(), !role.getIsActiveStatus()));
	}

	private Collection<Permission> getPermissionsFromRole(Role role) {
		LongStream streamOfPermissionIds = role.getPermissions().stream().mapToLong(Permission::getId);
		return usecase.getPermissions(streamOfPermissionIds);
	}

	private Boolean updateRoleActiveStatus(Long id, Boolean status) {
		int result = this.repository.updateActiveStatus(status, id);
		return result == 1;
	}


}
