package com.jamesaworo.stocky.features.settings.data.usecases_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.settings.data.repositories.SettingTaxRepository;
import com.jamesaworo.stocky.features.settings.domain.entities.SettingTax;
import com.jamesaworo.stocky.features.settings.domain.usecases.SettingUsecase;
import lombok.RequiredArgsConstructor;

import java.util.List;

/**
 * @author Aworo James
 * @since 4/20/23
 */
@Usecase
@RequiredArgsConstructor
public class SettingTaxUsecase implements SettingUsecase<SettingTax> {

    private final SettingTaxRepository repository;

    @Override
    public List<SettingTax> all() {
        return null;
    }

    @Override
    public SettingTax get(String key) {
        return null;
    }

    @Override
    public void updateAll(List<SettingTax> settings) {

    }

    @Override
    public void update(String key, SettingTax setting) {

    }
}