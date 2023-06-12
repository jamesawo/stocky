/*
 * @Author: james.junior
 * @Date: 6/12/23 14:34
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.interactor.contract;

import com.jamesaworo.stocky.features.company.data.request.CompanyExpensesCategoryRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface ICompanyExpensesCategoryInteractor {

	ResponseEntity<CompanyExpensesCategoryRequest> save(CompanyExpensesCategoryRequest category);

	ResponseEntity<List<CompanyExpensesCategoryRequest>> findAll();

	ResponseEntity<Optional<CompanyExpensesCategoryRequest>> findOne(Long id);

	ResponseEntity<Optional<CompanyExpensesCategoryRequest>> update(CompanyExpensesCategoryRequest request);
}
