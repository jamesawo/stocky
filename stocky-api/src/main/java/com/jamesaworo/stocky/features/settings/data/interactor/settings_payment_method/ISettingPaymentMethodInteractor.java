package com.jamesaworo.stocky.features.settings.data.interactors.settings_payment_method;

import com.jamesaworo.stocky.features.settings.data.dto.PaymentMethodDto;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

/**
 * @author Aworo James
 * @since 4/20/23
 */

public interface ISettingPaymentMethodInteractor {

    ResponseEntity<Optional<PaymentMethodDto>> getByName(String name);

    ResponseEntity<Optional<PaymentMethodDto>> getById(Long id);

    ResponseEntity<List<PaymentMethodDto>> all();
    
}