package com.jamesaworo.stocky.features.settings.endpoints;

import com.jamesaworo.stocky.features.settings.data.dto.PaymentMethodDto;
import com.jamesaworo.stocky.features.settings.data.interactors.settings_payment_method.ISettingPaymentMethodInteractor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

/**
 * @author Aworo James
 * @since 4/21/23
 */
@RestController
@RequestMapping(value = "setting-paymentmethod")
@RequiredArgsConstructor
public class SettingPaymentMethodEndpoint {

    private final ISettingPaymentMethodInteractor interactor;

    @GetMapping("by-name")
    public ResponseEntity<Optional<PaymentMethodDto>> getByName(@RequestParam() String name) {
        return this.interactor.getByName(name);
    }


    @GetMapping("by-id")
    public ResponseEntity<Optional<PaymentMethodDto>> getById(@RequestParam() Long id) {
        return this.interactor.getById(id);
    }


    @GetMapping(value = "all")
    public ResponseEntity<List<PaymentMethodDto>> getAll() {
        return interactor.all();
    }


}