package com.jamesaworo.stocky.features.settings.data.usecases_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.settings.data.repositories.SettingExpensesRepository;
import com.jamesaworo.stocky.features.settings.domain.entities.SettingExpenses;
import com.jamesaworo.stocky.features.settings.domain.usecases.SettingUsecase;
import lombok.RequiredArgsConstructor;

import java.util.List;

/**
 * @author Aworo James
 * @since 4/20/23
 */
@Usecase
@RequiredArgsConstructor
public class SettingExpensesUsecase implements SettingUsecase<SettingExpenses> {

    private final SettingExpensesRepository repository;


    @Override
    public List<SettingExpenses> all() {
        return null;
    }

    @Override
    public SettingExpenses get(String key) {
        return null;
    }

    @Override
    public void updateAll(List<SettingExpenses> settings) {

    }

    @Override
    public void update(String key, SettingExpenses setting) {

    }
}