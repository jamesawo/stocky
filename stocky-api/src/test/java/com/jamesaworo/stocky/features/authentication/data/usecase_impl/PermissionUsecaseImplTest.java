package com.jamesaworo.stocky.features.authentication.data.usecase_impl;

import com.jamesaworo.stocky.features.authentication.data.repository.PermissionRepository;
import com.jamesaworo.stocky.features.authentication.domain.entity.Permission;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.LongStream;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.anyLong;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
class PermissionUsecaseImplTest {
    @Mock
    private PermissionRepository repository;

    @InjectMocks
    private PermissionUsecaseImpl permissionUsecase;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName(value = "should call repository get all and return a list of Permission")
    void testGetAllPermissions() {
        // Arrange
        List<Permission> expectedPermissions = new ArrayList<>();
        when(repository.findAll()).thenReturn(expectedPermissions);

        // Act
        List<Permission> result = permissionUsecase.getAll();

        // Assert
        assertEquals(expectedPermissions, result);
    }

    @Test
    void testGetPermissionById() {
        // Arrange
        Long permissionId = 1L;
        Permission expectedPermission = new Permission();
        when(repository.findById(permissionId)).thenReturn(Optional.of(expectedPermission));

        // Act
        Optional<Permission> result = permissionUsecase.getById(permissionId);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(expectedPermission, result.get());
    }

    @Test
    void testGetPermissionById_NotFound() {
        // Arrange
        Long permissionId = 1L;
        when(repository.findById(permissionId)).thenReturn(Optional.empty());

        // Act
        Optional<Permission> result = permissionUsecase.getById(permissionId);

        // Assert
        assertFalse(result.isPresent());
    }

    @Test
    void testGetPermissionsByIds() {
        // Arrange
        LongStream idStream = LongStream.of(1L, 2L, 3L);
        List<Permission> expectedPermissions = new ArrayList<>();
        when(repository.findById(1L)).thenReturn(Optional.of(new Permission()));
        when(repository.findById(2L)).thenReturn(Optional.of(new Permission()));
        when(repository.findById(3L)).thenReturn(Optional.of(new Permission()));

        // Act
        Collection<Permission> result = permissionUsecase.getPermissionsByIds(idStream);

        // Assert
        assertEquals(3, result.size());
    }

    @Test
    void testGetPermissionsByIds_MissingPermissions() {
        // Arrange
        LongStream idStream = LongStream.of(1L, 2L, 3L);
        when(repository.findById(anyLong())).thenReturn(Optional.empty());

        // Act
        Collection<Permission> result = permissionUsecase.getPermissionsByIds(idStream);

        // Assert
        assertEquals(0, result.size());
    }
}
