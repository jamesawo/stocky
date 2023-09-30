package com.jamesaworo.stocky.features.authentication.data.usecase_impl;

import com.jamesaworo.stocky.features.authentication.data.repository.PermissionRepository;
import com.jamesaworo.stocky.features.authentication.domain.entity.Permission;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.LongStream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class PermissionUsecaseImplTest {
    @Mock
    private PermissionRepository repository;

    @InjectMocks
    private PermissionUsecaseImpl underTest;

    @BeforeEach
    void setUp() {
    }

    @Test
    @DisplayName("Given an empty permission repository, when calling getAll(), then should return an empty list of permissions")
    void testGetAllPermissions() {
        // Arrange
        List<Permission> expectedPermissions = new ArrayList<>();
        when(repository.findAll()).thenReturn(expectedPermissions);

        // Act
        List<Permission> result = underTest.getAll();

        // Assert
        assertThat(expectedPermissions).isEqualTo(result);
        verify(repository).findAll();
    }

    @Test
    @DisplayName("Given a valid permission ID, when calling getById(), then should return the corresponding permission")
    void testGetPermissionByIdReturnsCorrespondingPermission() {
        // Arrange
        Long permissionId = 1L;
        Permission expectedPermission = new Permission(permissionId);
        when(repository.findById(permissionId)).thenReturn(Optional.of(expectedPermission));

        // Act
        Optional<Permission> result = underTest.getById(permissionId);

        // Assert
        assertThat(result.isPresent()).isTrue();
        assertThat(expectedPermission).isEqualTo(result.get());
        verify(repository).findById(permissionId);
    }

    @Test
    @DisplayName("Given a non-existent permission ID, when calling getById(), then should return an empty optional")
    void testGetPermissionByIdReturnsEmptyOptionalForNonExistentId() {
        // Arrange
        Long permissionId = 1L;
        when(repository.findById(permissionId)).thenReturn(Optional.empty());

        // Act
        Optional<Permission> result = underTest.getById(permissionId);

        // Assert
        assertThat(result.isPresent()).isFalse();
        verify(repository).findById(permissionId);

    }

    @Test
    @DisplayName("Given a stream of valid permission IDs, when calling getPermissionsByIds(), then should return a collection of corresponding permissions")
    void testGetPermissionsByIds() {
        // Arrange
        LongStream idStream = LongStream.of(1L, 2L, 3L);
        when(underTest.getById(anyLong())).thenReturn(Optional.of(new Permission(anyLong())));

        // Act
        Collection<Permission> result = underTest.getPermissionsByIds(idStream);

        // Assert
        assertThat(result.size()).isEqualTo(3);
    }

    @Test
    @DisplayName("Given a stream of permission IDs with missing permissions, when calling getPermissionsByIds(), then should return an empty collection")
    void testGetPermissionsByIds_MissingPermissions() {
        // Arrange
        LongStream idStream = LongStream.of(1L, 2L, 3L);
        when(repository.findById(anyLong())).thenReturn(Optional.empty());

        // Act
        Collection<Permission> result = underTest.getPermissionsByIds(idStream);

        // Assert
        assertThat(result.size()).isEqualTo(0);
    }
}
