package com.jamesaworo.stocky.features.company.data.interactor.contract;

import com.jamesaworo.stocky.core.request.CommonRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface ICompanyPaymentOptionInteractor {

    ResponseEntity<List<CommonRequest>> findAll(boolean filterIsActive);

    ResponseEntity<Optional<CommonRequest>> save(CommonRequest request);

    ResponseEntity<Optional<CommonRequest>> find(Long id);

    ResponseEntity<Optional<CommonRequest>> update(CommonRequest request);

    ResponseEntity<Optional<Boolean>> toggleActiveStatus(Long id);
}
