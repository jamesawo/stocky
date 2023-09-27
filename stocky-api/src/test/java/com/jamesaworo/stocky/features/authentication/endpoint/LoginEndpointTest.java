package com.jamesaworo.stocky.features.authentication.endpoint;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jamesaworo.stocky.features.authentication.data.interactor.contract.ILoginInteractor;
import com.jamesaworo.stocky.features.authentication.data.request.LoginRequest;
import com.jamesaworo.stocky.features.authentication.data.request.LoginResponse;
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

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class LoginEndpointTest {
    public static final String ROUTE = API_PREFIX + "/auth";

    @Mock
    private ILoginInteractor interactor;

    @InjectMocks
    private LoginEndpoint underTest;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;


    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(underTest).build();
        objectMapper = new ObjectMapper();
    }


    @Test
    @DisplayName("Given a valid login request, when logging in, then should return ResponseEntity with success")
    public void login_WithValidRequest_ReturnsResponseEntityWithSuccess() {
        // Given
        LoginRequest request = new LoginRequest();
        LoginResponse expectedResult = new LoginResponse();

        // When
        when(interactor.login(request)).thenReturn(ResponseEntity.ok(expectedResult));
        ResponseEntity<LoginResponse> response = underTest.login(request);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(expectedResult);
        
        verify(interactor).login(request);
    }

    @Test
    @DisplayName("Given an invalid login request, when logging in, then should return ResponseEntity with error")
    public void login_WithInvalidRequest_ReturnsResponseEntityWithError() {
        // Given
        LoginRequest request = new LoginRequest();
        LoginResponse expectedResult = new LoginResponse();

        // When
        when(interactor.login(request)).thenReturn(ResponseEntity.badRequest().body(expectedResult));
        ResponseEntity<LoginResponse> response = underTest.login(request);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        verify(interactor).login(request);
    }

    @Test
    @DisplayName("Given an invalid login request, when making a POST request to /auth/login, then should return BadRequest")
    public void login_PostRequestWithInValidRequest_ReturnsHttpStatusOk() throws Exception {
        // Given
        LoginRequest request = new LoginRequest();

        // When-Then
        mockMvc.perform(post(ROUTE + "/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(interactor, never()).login(any());
    }

    @Test
    @DisplayName("Given a valid login request, when making a POST request to /auth/login, then should return HTTP 200 OK")
    public void login_PostRequestWithValidRequest_ReturnsHttpStatusOk() throws Exception {
        // Given
        LoginRequest request = new LoginRequest();
        request.setUsername("username");
        request.setPassword("password");
        LoginResponse expectedResult = new LoginResponse();
        expectedResult.setId(123L);

        // When-Then
        when(interactor.login(request)).thenReturn(ResponseEntity.ok(expectedResult));
        mockMvc.perform(post(ROUTE + "/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").exists())
                .andExpect(jsonPath("$").isNotEmpty());

        verify(interactor).login(request);
    }
}
