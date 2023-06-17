package com.jamesaworo.stocky.features.company.data.interactor.contract;

import com.jamesaworo.stocky.features.company.data.request.CompanyLocationRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface ICompanyLocationInteractor {

	ResponseEntity<List<CompanyLocationRequest>> findAll();

	ResponseEntity<Optional<CompanyLocationRequest>> save(CompanyLocationRequest request);

	ResponseEntity<Optional<CompanyLocationRequest>> find(Long id);

	ResponseEntity<Optional<CompanyLocationRequest>> update(CompanyLocationRequest request);

	ResponseEntity<Optional<Boolean>> toggleActiveStatus(Long id);
}
