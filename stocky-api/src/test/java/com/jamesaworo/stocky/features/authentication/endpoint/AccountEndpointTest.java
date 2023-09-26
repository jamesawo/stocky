package com.jamesaworo.stocky.features.authentication.endpoint;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.features.authentication.data.interactor.contract.IAccountInteractor;
import com.jamesaworo.stocky.features.authentication.data.request.AccountRequest;
import com.jamesaworo.stocky.features.company.data.request.CompanyEmployeeSearchRequest;
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

import java.util.List;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class AccountEndpointTest {
    public static final String ROUTE = API_PREFIX + "/auth/account";
    @Mock
    private IAccountInteractor interactor;

    @InjectMocks
    private AccountEndpoint underTest;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(underTest).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    @DisplayName("Given a valid search request, when searching for users' accounts in pages, then should return ResponseEntity with success")
    public void search_ForValidRequest_ReturnsResponseEntityWithSuccess() {
        // Given
        PageSearchRequest<CompanyEmployeeSearchRequest> request = new PageSearchRequest<>();
        PageSearchResult<List<AccountRequest>> expectedResult = new PageSearchResult<>();

        // When
        when(interactor.search(request)).thenReturn(ResponseEntity.ok(expectedResult));
        ResponseEntity<PageSearchResult<List<AccountRequest>>> response = underTest.searchForUsersAccountInPages(request);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(expectedResult);
        verify(interactor).search(request);
    }

    @Test
    @DisplayName("Given a valid search request, when making a POST request to /search, then should return HTTP 200 OK")
    public void search_PostRequestWithValidRequest_ReturnsHttpStatusOk() throws Exception {
        // Given
        PageSearchRequest<CompanyEmployeeSearchRequest> request = new PageSearchRequest<>();
        PageSearchResult<List<AccountRequest>> expectedResult = new PageSearchResult<>();

        // When
        when(interactor.search(request)).thenReturn(ResponseEntity.ok(expectedResult));

        // Then
        mockMvc.perform(post(ROUTE + "/search")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").exists())
                .andExpect(jsonPath("$").isEmpty());

        verify(interactor).search(request);
    }

    // update expiry date
    @Test
    @DisplayName("Given a valid userId and account request, when updating expiry date, then should return ResponseEntity with success")
    public void updateExpiryDate_WithValidUserIdAndRequest_ReturnsResponseEntityWithSuccess() {
        // Given
        Long userId = 123L;
        AccountRequest request = new AccountRequest();

        // When
        when(interactor.updateExpiryDate(userId, request)).thenReturn(ResponseEntity.ok(true));
        ResponseEntity<Boolean> response = underTest.updateExpiryDate(userId, request);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(true);
        verify(interactor).updateExpiryDate(userId, request);
    }

    @Test
    @DisplayName("Given an invalid userId and account request, when updating expiry date, then should return ResponseEntity with error")
    public void updateExpiryDate_WithInvalidUserIdAndRequest_ReturnsResponseEntityWithError() {
        // Given
        Long userId = 456L;
        AccountRequest request = new AccountRequest();

        // When
        when(interactor.updateExpiryDate(userId, request)).thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false));
        ResponseEntity<Boolean> response = underTest.updateExpiryDate(userId, request);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody()).isEqualTo(false);
        verify(interactor).updateExpiryDate(userId, request);
    }

    // update role
    @Test
    @DisplayName("Given a valid userId and account request, when updating role, then should return ResponseEntity with success")
    public void updateRole_WithValidUserIdAndRequest_ReturnsResponseEntityWithSuccess() {
        // Given
        Long userId = 123L;
        AccountRequest request = new AccountRequest();
        // When
        when(interactor.updateRoles(userId, request)).thenReturn(ResponseEntity.ok(true));
        ResponseEntity<Boolean> response = underTest.updateRole(userId, request);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(true);
        verify(interactor).updateRoles(userId, request);
    }

    @Test
    @DisplayName("Given an invalid userId and account request, when updating role, then should return ResponseEntity with error")
    public void updateRole_WithInvalidUserIdAndRequest_ReturnsResponseEntityWithError() {
        // Given
        Long userId = 456L;
        AccountRequest request = new AccountRequest();

        // When
        when(interactor.updateRoles(userId, request)).thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false));
        ResponseEntity<Boolean> response = underTest.updateRole(userId, request);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody()).isEqualTo(false);
        verify(interactor).updateRoles(userId, request);
    }

    // update password
    @Test
    @DisplayName("Given a valid userId and account request, when updating password, then should return ResponseEntity with success")
    public void updatePassword_WithValidUserIdAndRequest_ReturnsResponseEntityWithSuccess() {
        // Given
        Long userId = 123L;
        AccountRequest request = new AccountRequest();

        // When
        when(interactor.updatePassword(userId, request)).thenReturn(ResponseEntity.ok(true));
        ResponseEntity<Boolean> response = underTest.updatePassword(userId, request);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(true);

        verify(interactor).updatePassword(userId, request);
    }

    @Test
    @DisplayName("Given an invalid userId and account request, when updating password, then should return ResponseEntity with error")
    public void updatePassword_WithInvalidUserIdAndRequest_ReturnsResponseEntityWithError() {
        // Given
        Long userId = 456L;
        AccountRequest request = new AccountRequest();

        // When
        when(interactor.updatePassword(userId, request)).thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false));
        ResponseEntity<Boolean> response = underTest.updatePassword(userId, request);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody()).isEqualTo(false);

        verify(interactor).updatePassword(userId, request);
    }

    @Test
    @DisplayName("Given a valid userId and account request, when making a PUT request to /update-password/{userId}, then should return HTTP 200 OK")
    public void updatePassword_PutRequestWithValidUserIdAndRequest_ReturnsHttpStatusOk() throws Exception {

        // Given
        Long userId = 123L;
        AccountRequest request = new AccountRequest();

        // Mock the behavior of the interactor using ArgumentMatchers
        when(interactor.updatePassword(eq(userId), any(AccountRequest.class))).thenReturn(ResponseEntity.ok(true));

        // When and Then
        mockMvc.perform(put(ROUTE + "/update-password/{userId}", userId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(true));

        verify(interactor, times(1)).updatePassword(eq(userId), any(AccountRequest.class));
    }

    // toggle status
    @Test
    @DisplayName("Given a valid userId, when toggling status, then should return ResponseEntity with success")
    public void toggleStatus_WithValidUserId_ReturnsResponseEntityWithSuccess() {
        // Given
        Long userId = 123L;

        // When
        when(interactor.toggleStatus(userId)).thenReturn(ResponseEntity.ok(true));
        ResponseEntity<Boolean> response = underTest.toggleStatus(userId);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(true);

        // Verify that the interactor toggleStatus method was called with the correct userId
        verify(interactor).toggleStatus(userId);
    }

    @Test
    @DisplayName("Given an invalid userId, when toggling status, then should return ResponseEntity with error")
    public void toggleStatus_WithInvalidUserId_ReturnsResponseEntityWithError() {
        // Given
        Long userId = 456L;

        // When
        when(interactor.toggleStatus(userId)).thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false));
        ResponseEntity<Boolean> response = underTest.toggleStatus(userId);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody()).isEqualTo(false);

        // Verify that the interactor toggleStatus method was called with the correct userId
        verify(interactor).toggleStatus(userId);
    }

    @Test
    @DisplayName("Given a valid userId, when making a PUT request to /toggle-status/{userId}, then should return HTTP 200 OK")
    public void toggleStatus_PutRequestWithValidUserId_ReturnsHttpStatusOk() throws Exception {
        // Given
        Long userId = 789L;

        when(interactor.toggleStatus(userId)).thenReturn(ResponseEntity.ok(true));

        // When-Then
        mockMvc.perform(put(ROUTE + "/toggle-status/{userId}", userId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").value(true));

        // Verify that the interactor toggleStatus method was called with the correct userId
        verify(interactor).toggleStatus(userId);
    }
}