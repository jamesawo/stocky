/*
 * @Author: james.junior
 * @Date: 6/15/23 01:01
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.features.company.data.interactor.contract.ICompanySetupInteractor;
import com.jamesaworo.stocky.features.company.data.request.CompanyDetailRequest;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyBasicDetail;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyBasicDetailUsecase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.lang.Boolean.FALSE;
import static java.lang.Boolean.TRUE;
import static java.util.Optional.of;
import static org.springframework.http.ResponseEntity.ok;

@Usecase
@RequiredArgsConstructor
@Slf4j
public class CompanySetupInteractorImpl implements ICompanySetupInteractor, Mapper<CompanyDetailRequest, CompanyBasicDetail> {
    private final ICompanyBasicDetailUsecase usecase;
    private final ModelMapper mapper;


    @Override
    public ResponseEntity<Map<String, String>> getAll() {
        Map<String, String> basicDetailMap = new HashMap<>();
        List<CompanyBasicDetail> all = this.usecase.all();
        all.forEach(basicDetail -> appendBasicDetailToMap(basicDetail, basicDetailMap));
        return ok().body(basicDetailMap);
    }

    private void appendBasicDetailToMap(CompanyBasicDetail basicDetail, Map<String, String> basicDetailMap) {
        basicDetailMap.put(basicDetail.getSetupKey(), basicDetail.getSetupValue());
    }

    @Override
    public ResponseEntity<Optional<CompanyDetailRequest>> get(String key) {
        Optional<CompanyBasicDetail> optional = this.usecase.get(key);
        return ok().body(optional.map(this::toRequest));
    }

    @Override
    public ResponseEntity<Optional<Boolean>> update(String key, String value) {
        Optional<Boolean> optionalBoolean = this.usecase.update(key, value);
        return ok().body(optionalBoolean);
    }

    @Override
    public ResponseEntity<Optional<Boolean>> updateMany(List<CompanyDetailRequest> requestList) {
        try {
            List<CompanyBasicDetail> basicDetailList = requestList.stream().map(this::toModel).collect(Collectors.toList());
            this.usecase.updateMany(basicDetailList);
            return ok().body(of(TRUE));
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return ok().body(of(FALSE));
        }
    }

    @Override
    public CompanyDetailRequest toRequest(CompanyBasicDetail model) {
        return this.mapper.map(model, CompanyDetailRequest.class);
    }

    @Override
    public CompanyBasicDetail toModel(CompanyDetailRequest request) {
        return this.mapper.map(request, CompanyBasicDetail.class);
    }
}
