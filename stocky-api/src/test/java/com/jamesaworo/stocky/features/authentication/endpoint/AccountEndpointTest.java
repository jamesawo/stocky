package com.jamesaworo.stocky.features.authentication.endpoint;

import com.jamesaworo.stocky.core.params.PageSearchRequest;
import com.jamesaworo.stocky.core.params.PageSearchResult;
import com.jamesaworo.stocky.features.authentication.data.interactor.contract.IAccountInteractor;
import com.jamesaworo.stocky.features.authentication.data.request.AccountRequest;
import com.jamesaworo.stocky.features.company.data.request.CompanyEmployeeSearchRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AccountEndpointTest {
    @Mock
    private IAccountInteractor interactor;

    @InjectMocks
    private AccountEndpoint underTest;


    @Test
    @DisplayName("Given a valid search request, when searching for users' accounts in pages, then should return ResponseEntity with success")
    public void search_ForValidRequest_ReturnsResponseEntityWithSuccess() {
        // Given
        PageSearchRequest<CompanyEmployeeSearchRequest> request = new PageSearchRequest<>();
        // Set up any necessary test data for the request

        PageSearchResult<List<AccountRequest>> expectedResult = new PageSearchResult<>();
        // Set up the expected result from the interactor

        when(interactor.search(request)).thenReturn(ResponseEntity.ok(expectedResult));

        // When
        ResponseEntity<PageSearchResult<List<AccountRequest>>> response = underTest.searchForUsersAccountInPages(request);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(expectedResult);

        // Verify that the interactor's search method was called with the correct request
        verify(interactor).search(request);
    }

    @Test
    @DisplayName("Given an invalid search request, when searching for users' accounts in pages, then should return ResponseEntity with error")
    public void search_ForInvalidRequest_ReturnsResponseEntityWithError() {
        // Given
        PageSearchRequest<CompanyEmployeeSearchRequest> request = new PageSearchRequest<>();
        // Set up an invalid request that fails validation or contains incorrect data

        // When
        ResponseEntity<PageSearchResult<List<AccountRequest>>> response = underTest.searchForUsersAccountInPages(request);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        // Add more assertions to validate the error response, such as error message or error code

        // Verify that the interactor's search method was not called
        verify(interactor, never()).search(request);
    }

    // Add more test cases for edge cases, specific scenarios, and failure cases

}