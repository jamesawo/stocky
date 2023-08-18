package com.jamesaworo.stocky.features.authentication.domain.usecase;

import com.jamesaworo.stocky.features.authentication.domain.entity.Permission;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.LongStream;

public interface IPermissionUsecase {

    List<Permission> getAll();

    Optional<Permission> getById(Long id);

    Collection<Permission> getPermissionsByIds(LongStream list);
}
