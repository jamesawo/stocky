package com.jamesaworo.stocky.features.settings.data.interactor.settings_payment_method;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.features.settings.data.dto.PaymentMethodDto;
import com.jamesaworo.stocky.features.settings.data.usecases_impl.SettingPaymentMethodUsecase;
import com.jamesaworo.stocky.features.settings.domain.entity.SettingPaymentMethod;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author Aworo James
 * @since 4/20/23
 */
@Interactor
@AllArgsConstructor
public class SettingPaymentMethodInteractor implements ISettingPaymentMethodInteractor, Mapper<PaymentMethodDto, SettingPaymentMethod> {

    private final SettingPaymentMethodUsecase usecase;


    @Override
    public ResponseEntity<Optional<PaymentMethodDto>> getByName(String name) {
        var optionalPaymentMethod = this.usecase.get(name);
        return ResponseEntity.ok(optionalPaymentMethod.map(this::toRequest));
    }

    @Override
    public ResponseEntity<Optional<PaymentMethodDto>> getById(Long id) {
        var optionalPaymentMethod = this.usecase.getById(id);
        return ResponseEntity.ok(optionalPaymentMethod.map(this::toRequest));
    }

    @Override
    public ResponseEntity<List<PaymentMethodDto>> all() {
        var settingsList = this.usecase.all();
        var settingDtoList = settingsList.stream().map(this::toRequest).collect(Collectors.toList());
        return ResponseEntity.ok(settingDtoList);
    }


    @Override
    public PaymentMethodDto toRequest(SettingPaymentMethod model) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(model, PaymentMethodDto.class);
    }

    @Override
    public SettingPaymentMethod toModel(PaymentMethodDto request) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(request, SettingPaymentMethod.class);
    }
}