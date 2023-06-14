package com.jamesaworo.stocky.features.authentication.data.repository;

import com.jamesaworo.stocky.features.authentication.domain.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {
}
