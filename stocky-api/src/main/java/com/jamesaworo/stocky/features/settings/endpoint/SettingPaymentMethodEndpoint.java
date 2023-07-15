package com.jamesaworo.stocky.features.settings.endpoint;

import com.jamesaworo.stocky.features.settings.data.dto.PaymentMethodRequest;
import com.jamesaworo.stocky.features.settings.data.interactor.settings_payment_method.ISettingPaymentMethodInteractor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import static com.jamesaworo.stocky.core.constants.Global.API_PREFIX;

/**
 * @author Aworo James
 * @since 4/21/23
 */
@RestController
@RequestMapping(value = API_PREFIX + "/setting-payment-method")
@RequiredArgsConstructor
public class SettingPaymentMethodEndpoint {

    private final ISettingPaymentMethodInteractor interactor;

    @GetMapping("by-name")
    public ResponseEntity<Optional<PaymentMethodRequest>> getByName(@RequestParam() String name) {
        return this.interactor.getByName(name);
    }


    @GetMapping("by-id")
    public ResponseEntity<Optional<PaymentMethodRequest>> getById(@RequestParam() Long id) {
        return this.interactor.getById(id);
    }


    @GetMapping(value = "all")
    public ResponseEntity<List<PaymentMethodRequest>> getAll() {
        return interactor.all();
    }


}