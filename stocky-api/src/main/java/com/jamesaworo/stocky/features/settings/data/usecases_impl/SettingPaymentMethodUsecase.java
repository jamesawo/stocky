package com.jamesaworo.stocky.features.settings.data.usecases_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.settings.data.repositories.SettingPaymentMethodRepository;
import com.jamesaworo.stocky.features.settings.domain.entities.SettingPaymentMethod;
import com.jamesaworo.stocky.features.settings.domain.usecases.SettingUsecase;
import lombok.RequiredArgsConstructor;

import java.util.List;

/**
 * @author Aworo James
 * @since 4/20/23
 */
@Usecase
@RequiredArgsConstructor
public class SettingPaymentMethodUsecase implements SettingUsecase<SettingPaymentMethod> {

    private final SettingPaymentMethodRepository repository;

    @Override
    public List<SettingPaymentMethod> all() {
        return null;
    }

    @Override
    public SettingPaymentMethod get(String key) {
        return null;
    }

    @Override
    public void updateAll(List<SettingPaymentMethod> settings) {

    }

    @Override
    public void update(String key, SettingPaymentMethod setting) {

    }
}