/*
 * @Author: james.junior
 * @Date: 5/22/23 00:37
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.company.data.interactor.implementation;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.base.BaseModel;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.core.request.CommonRequest;
import com.jamesaworo.stocky.features.company.data.interactor.contract.ICompanyPaymentOptionInteractor;
import com.jamesaworo.stocky.features.company.domain.entity.CompanyPaymentOption;
import com.jamesaworo.stocky.features.company.domain.usecase.ICompanyPaymentOptionUsecase;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.http.ResponseEntity.ok;

@Interactor
@RequiredArgsConstructor
public class CompanyPaymentOptionInteractorImpl implements ICompanyPaymentOptionInteractor, Mapper<CommonRequest, CompanyPaymentOption> {

    private final ICompanyPaymentOptionUsecase usecase;
    private final ModelMapper mapper;

    @Override
    public ResponseEntity<List<CommonRequest>> findAll(boolean filterIsActive) {
        List<CompanyPaymentOption> modelList = usecase.findAll();
        List<CommonRequest> requestList;
        if (filterIsActive) {
            requestList = modelList.stream().filter(BaseModel::getIsActiveStatus).map(this::toRequest).collect(Collectors.toList());
        } else {
            requestList = modelList.stream().map(this::toRequest).collect(Collectors.toList());
        }
        return ok(requestList);
    }

    @Override
    public ResponseEntity<Optional<CommonRequest>> save(CommonRequest request) {
        Optional<CompanyPaymentOption> save = this.usecase.save(toModel(request));
        return ok(save.map(this::toRequest));
    }


    @Override
    public ResponseEntity<Optional<CommonRequest>> find(Long id) {
        Optional<CompanyPaymentOption> optional = this.usecase.findOne(id);
        return ok(optional.map(this::toRequest));
    }

    @Override
    public ResponseEntity<Optional<CommonRequest>> update(CommonRequest request) {
        return this.save(request);
    }

    @Override
    public ResponseEntity<Optional<Boolean>> toggleActiveStatus(Long id) {
        Optional<CompanyPaymentOption> optional = this.usecase.findOne(id);
        return ok().body(optional.map(value -> this.usecase.toggleStatus(!value.getIsActiveStatus(), value.getId())));
    }

    @Override
    public CompanyPaymentOption toModel(CommonRequest request) {
        return this.mapper.map(request, CompanyPaymentOption.class);
    }

    @Override
    public CommonRequest toRequest(CompanyPaymentOption model) {
        return this.mapper.map(model, CommonRequest.class);
    }

}
