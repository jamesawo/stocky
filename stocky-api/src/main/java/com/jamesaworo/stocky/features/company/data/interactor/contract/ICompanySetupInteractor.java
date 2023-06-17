package com.jamesaworo.stocky.features.company.data.interactor.contract;

import com.jamesaworo.stocky.features.company.data.request.CompanyDetailRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface ICompanySetupInteractor {

	ResponseEntity<Map<String, String>> getAll();

	ResponseEntity<Optional<CompanyDetailRequest>> get(String key);

	ResponseEntity<Optional<Boolean>> update(String key, String value);

	ResponseEntity<Optional<Boolean>> updateMany(List<CompanyDetailRequest> requestList);

}

