package com.jamesaworo.stocky.features.settings.data.interactor.settings_payment_method;

import com.jamesaworo.stocky.features.settings.data.dto.PaymentMethodRequest;
import com.jamesaworo.stocky.features.settings.data.interactor.base.ISettingBaseInteractor;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

/**
 * @author Aworo James
 * @since 4/20/23
 */

public interface ISettingPaymentMethodInteractor extends ISettingBaseInteractor {

    ResponseEntity<Optional<PaymentMethodRequest>> getByName(String name);

    ResponseEntity<Optional<PaymentMethodRequest>> getById(Long id);

    ResponseEntity<List<PaymentMethodRequest>> all();

}