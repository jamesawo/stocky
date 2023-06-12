/*
 * @Author: james.junior
 * @Date: 6/12/23 14:34
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.features.company.data.interactor.contract.ICompanyExpensesCategoryInteractor;
import com.jamesaworo.stocky.features.company.data.request.CompanyExpensesCategoryRequest;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyExpensesCategory;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyExpensesCategoryUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.http.ResponseEntity.ok;

@Interactor
@RequiredArgsConstructor
public class CompanyExpensesCategoryInteractor implements ICompanyExpensesCategoryInteractor, Mapper<CompanyExpensesCategoryRequest, CompanyExpensesCategory> {

	private final ModelMapper mapper;
	private final ICompanyExpensesCategoryUsecase usecase;

	@Override
	public CompanyExpensesCategoryRequest toRequest(CompanyExpensesCategory model) {
		return mapper.map(model, CompanyExpensesCategoryRequest.class);
	}

	@Override
	public CompanyExpensesCategory toModel(CompanyExpensesCategoryRequest request) {
		return mapper.map(request, CompanyExpensesCategory.class);
	}

	@Override
	public ResponseEntity<CompanyExpensesCategoryRequest> save(CompanyExpensesCategoryRequest category) {
		CompanyExpensesCategory save = saveRequest(category);
		return ok().body(toRequest(save));
	}

	@Override
	public ResponseEntity<List<CompanyExpensesCategoryRequest>> findAll() {
		List<CompanyExpensesCategory> list = this.usecase.findAll();
		List<CompanyExpensesCategoryRequest> requests = list.stream().map(this::toRequest).collect(Collectors.toList());
		return ok().body(requests);
	}

	@Override
	public ResponseEntity<Optional<CompanyExpensesCategoryRequest>> findOne(Long id) {
		Optional<CompanyExpensesCategory> optional = this.usecase.findOne(id);
		return ok().body(optional.map(this::toRequest));
	}

	@Override
	public ResponseEntity<Optional<CompanyExpensesCategoryRequest>> update(CompanyExpensesCategoryRequest request) {
		Optional<CompanyExpensesCategory> optional = this.usecase.findOne(request.getId());
		return ok().body(optional.map(found -> this.toRequest(this.saveRequest(request))));
	}

	private CompanyExpensesCategory saveRequest(CompanyExpensesCategoryRequest request) {
		return this.usecase.save(this.toModel(request));
	}

}
