package com.jamesaworo.stocky.features.settings.data.usecases_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.settings.data.repository.SettingPaymentMethodRepository;
import com.jamesaworo.stocky.features.settings.domain.entity.SettingPaymentMethod;
import com.jamesaworo.stocky.features.settings.domain.usecase.ISettingPaymentMethodUsecase;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

/**
 * @author Aworo James
 * @since 4/20/23
 */
@Usecase
@RequiredArgsConstructor
public class SettingPaymentMethodUsecase implements ISettingPaymentMethodUsecase {

    private final SettingPaymentMethodRepository repository;

    @Override
    public List<SettingPaymentMethod> all() {
        return this.repository.findAll();
    }

    @Override
    public Optional<SettingPaymentMethod> get(String title) {
        return this.repository.findByTitle(title);
    }

    @Override
    public Boolean updateMany(List<SettingPaymentMethod> settings) {
        return null;
    }

    @Override
    public Boolean update(String key, String value) {
        return null;
    }

    @Override
    public Optional<SettingPaymentMethod> getById(Long id) {
        return this.repository.findById(id);
    }


}