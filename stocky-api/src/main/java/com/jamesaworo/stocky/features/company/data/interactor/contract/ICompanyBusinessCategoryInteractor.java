/*
 * @Author: james.junior
 * @Date: 6/16/23 09:30
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.interactor.contract;

import com.jamesaworo.stocky.features.company.data.request.CompanyBusinessCategoryRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface ICompanyBusinessCategoryInteractor {
	
	ResponseEntity<List<CompanyBusinessCategoryRequest>> getAll();

	ResponseEntity<Optional<CompanyBusinessCategoryRequest>> getOne(Long id);

}
