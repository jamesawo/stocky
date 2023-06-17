/*
 * @Author: james.junior
 * @Date: 5/22/23 00:37
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.features.company.data.interactor.contract.ICompanyLocationInteractor;
import com.jamesaworo.stocky.features.company.data.request.CompanyLocationRequest;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyLocation;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyLocationUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.http.ResponseEntity.ok;

@Interactor
@RequiredArgsConstructor
public class CompanyLocationInteractorImpl implements ICompanyLocationInteractor, Mapper<CompanyLocationRequest, CompanyLocation> {

	private final ICompanyLocationUsecase usecase;
	private final ModelMapper mapper;

	@Override
	public ResponseEntity<List<CompanyLocationRequest>> findAll() {
		List<CompanyLocation> modelList = usecase.findAll();
		List<CompanyLocationRequest> requestList = modelList.stream().map(this::toRequest).collect(Collectors.toList());
		return ok(requestList);
	}

	@Override
	public ResponseEntity<Optional<CompanyLocationRequest>> save(CompanyLocationRequest request) {
		Optional<CompanyLocation> save = this.usecase.save(toModel(request));
		return ok(save.map(this::toRequest));
	}


	@Override
	public ResponseEntity<Optional<CompanyLocationRequest>> find(Long id) {
		Optional<CompanyLocation> optional = this.usecase.findOne(id);
		return ok(optional.map(this::toRequest));
	}

	@Override
	public ResponseEntity<Optional<CompanyLocationRequest>> update(CompanyLocationRequest request) {
		return this.save(request);
	}

	@Override
	public ResponseEntity<Optional<Boolean>> toggleActiveStatus(Long id) {
		Optional<CompanyLocation> optional = this.usecase.findOne(id);
		return ok().body(optional.map(value -> this.usecase.toggleStatus(!value.getIsActiveStatus(), value.getId())));
	}

	@Override
	public CompanyLocation toModel(CompanyLocationRequest request) {
		return this.mapper.map(request, CompanyLocation.class);
	}

	@Override
	public CompanyLocationRequest toRequest(CompanyLocation model) {
		return this.mapper.map(model, CompanyLocationRequest.class);
	}

}
