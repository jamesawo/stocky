package com.jamesaworo.stocky.features.authentication.endpoint;

import com.jamesaworo.stocky.features.authentication.data.interactor.contract.IPermissionInteractor;
import com.jamesaworo.stocky.features.authentication.data.request.PermissionGroupRequest;
import com.jamesaworo.stocky.features.authentication.domain.enums.AppModuleEnum;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class PermissionsEndpointTest {
    public static final String ROUTE = API_PREFIX + "/auth/permission";

    @Mock
    private IPermissionInteractor interactor;

    @InjectMocks
    private PermissionsEndpoint underTest;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(underTest).build();
    }

    @Test
    @DisplayName("Given a request to get all permissions grouped by module, when calling the endpoint, then should return ResponseEntity with success")
    public void getAllPermissionsGroupedByModule_ReturnsResponseEntityWithSuccess() {
        // Given
        PermissionGroupRequest perm1 = new PermissionGroupRequest(AppModuleEnum.SALE, new ArrayList<>());
        PermissionGroupRequest perm2 = new PermissionGroupRequest(AppModuleEnum.PEOPLE, new ArrayList<>());
        List<PermissionGroupRequest> expectedResult = List.of(perm1, perm2);

        // When
        when(interactor.getAllGroupedByModule()).thenReturn(ResponseEntity.ok(expectedResult));
        ResponseEntity<List<PermissionGroupRequest>> response = underTest.getAllPermissionsGroupedByModule();

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(expectedResult);

        verify(interactor).getAllGroupedByModule();
    }

    @Test
    @DisplayName("Given a request to get all permissions grouped by module, when an error occurs, then should return ResponseEntity with error")
    public void getAllPermissionsGroupedByModule_ReturnsResponseEntityWithError() throws Exception {
        // Given
        when(interactor.getAllGroupedByModule()).thenReturn(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());

        // When-Then
        mockMvc.perform(get(ROUTE + "/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());

        verify(interactor).getAllGroupedByModule();
    }

    @Test
    @DisplayName("Given a request to get all permissions grouped by module, should return ResponseEntity.OK with List of Permissions")
    public void getAllPermissionsGroupedByModule_ReturnsResponseEntityWithOK() throws Exception {
        // Given
        PermissionGroupRequest perm1 = new PermissionGroupRequest(AppModuleEnum.SALE, new ArrayList<>());
        PermissionGroupRequest perm2 = new PermissionGroupRequest(AppModuleEnum.PEOPLE, new ArrayList<>());
        List<PermissionGroupRequest> expectedResult = List.of(perm1, perm2);


        // When-Then
        when(interactor.getAllGroupedByModule()).thenReturn(ResponseEntity.status(HttpStatus.OK).body(expectedResult));
        mockMvc.perform(get(ROUTE + "/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isNotEmpty())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$").exists())
        ;

        verify(interactor).getAllGroupedByModule();
    }

}