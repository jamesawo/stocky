package com.jamesaworo.stocky.features.settings.data.interactor.settings_payment_method;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.features.settings.data.dto.PaymentMethodRequest;
import com.jamesaworo.stocky.features.settings.data.dto.SettingRequest;
import com.jamesaworo.stocky.features.settings.data.usecases_impl.SettingPaymentMethodUsecase;
import com.jamesaworo.stocky.features.settings.domain.entity.SettingPaymentMethod;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author Aworo James
 * @since 4/20/23
 */
@Interactor
@AllArgsConstructor
public class SettingPaymentMethodInteractor implements ISettingPaymentMethodInteractor, Mapper<PaymentMethodRequest, SettingPaymentMethod> {

    private final SettingPaymentMethodUsecase usecase;


    @Override
    public ResponseEntity<Optional<PaymentMethodRequest>> getByName(String name) {
        var optionalPaymentMethod = this.usecase.get(name);
        return ResponseEntity.ok(optionalPaymentMethod.map(this::toRequest));
    }

    @Override
    public ResponseEntity<Optional<PaymentMethodRequest>> getById(Long id) {
        var optionalPaymentMethod = this.usecase.getById(id);
        return ResponseEntity.ok(optionalPaymentMethod.map(this::toRequest));
    }

    @Override
    public ResponseEntity<List<PaymentMethodRequest>> all() {
        var settingsList = this.usecase.all();
        var settingDtoList = settingsList.stream().map(this::toRequest).collect(Collectors.toList());
        return ResponseEntity.ok(settingDtoList);
    }


    @Override
    public PaymentMethodRequest toRequest(SettingPaymentMethod model) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(model, PaymentMethodRequest.class);
    }

    @Override
    public SettingPaymentMethod toModel(PaymentMethodRequest request) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(request, SettingPaymentMethod.class);
    }

    @Override
    public ResponseEntity<SettingRequest> get(String key) {

        ResponseEntity<Optional<PaymentMethodRequest>> response = this.getByName(key);
        PaymentMethodRequest paymentMethodRequest = new PaymentMethodRequest();
        if (Objects.requireNonNull(response.getBody()).isPresent()) {
            Optional<PaymentMethodRequest> body = response.getBody();
            paymentMethodRequest = body.orElse(new PaymentMethodRequest());
        }
        return new ResponseEntity<>(paymentMethodRequest, response.getStatusCode());
    }

    @Override
    public ResponseEntity<List<SettingRequest>> getAll() {
        ResponseEntity<List<PaymentMethodRequest>> response = this.all();
        if (response.getBody() != null) {
            return new ResponseEntity<>(new ArrayList<>(response.getBody()), response.getStatusCode());
        }
        return new ResponseEntity<>(new ArrayList<>(), response.getStatusCode());
    }

    @Override
    public ResponseEntity<Boolean> update(SettingRequest dto) {
        throw new RuntimeException("Interface method not implemented");
    }

    @Override
    public ResponseEntity<Boolean> updateAll(List<SettingRequest> list) {
        throw new RuntimeException("Interface method not implemented");
    }
}