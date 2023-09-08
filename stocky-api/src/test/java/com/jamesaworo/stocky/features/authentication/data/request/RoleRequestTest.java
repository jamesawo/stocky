package com.jamesaworo.stocky.features.authentication.data.request;

import com.jamesaworo.stocky.features.authentication.domain.entity.Role;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class RoleRequestTest {

    @Test
    @DisplayName("Given a proper Role Object with required properties, Should map a Role object to RoleRequest object with partial properties only")
    public void testToPartialRequest() {
        // Given
        Role role = new Role();
        role.setId(1L);
        role.setName("RoleName");
        role.setDescription("RoleDescription");

        // When
        RoleRequest request = RoleRequest.toPartialRequest(role);

        // Then
        assertEquals(role.getId(), request.getId());
        assertEquals(role.getName(), request.getName());
        assertEquals(role.getDescription(), request.getDescription());

    }

    @Test
    @DisplayName("Given an improper Role Object with few properties, Should return a role object with same properties")
    public void withInvalidRole_testToPartialRequest() {
        // Given
        Role role = new Role();
        role.setDescription("RoleDescription");

        // When
        RoleRequest request = RoleRequest.toPartialRequest(role);

        // Then
        assertEquals(role.getId(), request.getId());
        assertEquals(role.getName(), request.getName());
        assertEquals(role.getDescription(), request.getDescription());

    }
}