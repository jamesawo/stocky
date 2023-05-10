package com.jamesaworo.stocky.features.settings.data.interactors.settings_payment_method;

import com.jamesaworo.stocky.core.annotations.Interactor;
import com.jamesaworo.stocky.core.mapper.Mapper;
import com.jamesaworo.stocky.features.settings.data.dto.PaymentMethodDto;
import com.jamesaworo.stocky.features.settings.data.usecases_impl.SettingPaymentMethodUsecase;
import com.jamesaworo.stocky.features.settings.domain.entities.SettingPaymentMethod;
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
        return ResponseEntity.ok(optionalPaymentMethod.map(this::to));
    }

    @Override
    public ResponseEntity<Optional<PaymentMethodDto>> getById(Long id) {
        var optionalPaymentMethod = this.usecase.getById(id);
        return ResponseEntity.ok(optionalPaymentMethod.map(this::to));
    }

    @Override
    public ResponseEntity<List<PaymentMethodDto>> all() {
        var settingsList = this.usecase.all();
        var settingDtoList = settingsList.stream().map(this::to).collect(Collectors.toList());
        return ResponseEntity.ok(settingDtoList);
    }


    @Override
    public PaymentMethodDto to(SettingPaymentMethod input) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(input, PaymentMethodDto.class);
    }

    @Override
    public SettingPaymentMethod from(PaymentMethodDto output) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(output, SettingPaymentMethod.class);
    }
}