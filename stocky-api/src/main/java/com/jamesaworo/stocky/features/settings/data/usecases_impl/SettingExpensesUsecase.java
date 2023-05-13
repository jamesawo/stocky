package com.jamesaworo.stocky.features.settings.data.usecases_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.settings.data.repository.SettingExpensesRepository;
import com.jamesaworo.stocky.features.settings.domain.entity.SettingExpenses;
import com.jamesaworo.stocky.features.settings.domain.usecase.ISettingUsecase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

/**
 * @author Aworo James
 * @since 4/20/23
 */
@Usecase
@RequiredArgsConstructor
@Slf4j
public class SettingExpensesUsecase implements ISettingUsecase<SettingExpenses> {

    private final SettingExpensesRepository repository;


    @Override
    public List<SettingExpenses> all() {
        return this.repository.findAll();
    }

    @Override
    public Optional<SettingExpenses> get(String key) {
        return this.repository.findBySettingKey(key);
    }

    @Override
    public Boolean updateMany(List<SettingExpenses> settings) {

        try {
            settings.forEach(s -> this.update(s.getSettingKey(), s.getSettingValue()));
            return true;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return false;
        }
    }

    @Override
    public Boolean update(String key, String value) {
        var optionalSetting = this.get(key);
        return optionalSetting.map(e -> {
            var updated = this.repository.updateByKey(key, value);
            return updated == 1;
        }).orElse(false);
    }
}