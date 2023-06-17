/*
 * @Author: james.junior
 * @Date: 6/16/23 09:32
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.features.company.data.interactor.contract.ICompanyBusinessCategoryInteractor;
import com.jamesaworo.stocky.features.company.data.request.CompanyBusinessCategoryRequest;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyBusinessCategory;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyBusinessCategoryUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.http.ResponseEntity.ok;

@Interactor
@RequiredArgsConstructor
public class CompanyBusinessCategoryInteractor implements ICompanyBusinessCategoryInteractor, Mapper<CompanyBusinessCategoryRequest, CompanyBusinessCategory> {

	private final ICompanyBusinessCategoryUsecase usecase;
	private final ModelMapper mapper;

	@Override
	public ResponseEntity<List<CompanyBusinessCategoryRequest>> getAll() {
		List<CompanyBusinessCategory> list = this.usecase.getAll();
		List<CompanyBusinessCategoryRequest> requests = list.stream().map(this::toRequest).collect(Collectors.toList());
		return ok().body(requests);
	}

	@Override
	public ResponseEntity<Optional<CompanyBusinessCategoryRequest>> getOne(Long id) {
		Optional<CompanyBusinessCategory> optional = this.usecase.getOne(id);
		return ok().body(optional.map(this::toRequest));
	}

	@Override
	public CompanyBusinessCategoryRequest toRequest(CompanyBusinessCategory model) {
		return this.mapper.map(model, CompanyBusinessCategoryRequest.class);
	}

	@Override
	public CompanyBusinessCategory toModel(CompanyBusinessCategoryRequest request) {
		return this.mapper.map(request, CompanyBusinessCategory.class);
	}
}
