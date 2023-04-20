package com.jamesaworo.stocky.features.settings.data.usecases_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.settings.data.repositories.SettingDashboardRepository;
import com.jamesaworo.stocky.features.settings.domain.entities.SettingDashboard;
import com.jamesaworo.stocky.features.settings.domain.usecases.SettingUsecase;
import lombok.RequiredArgsConstructor;

import java.util.List;

/**
 * @author Aworo James
 * @since 4/20/23
 */
@Usecase
@RequiredArgsConstructor
public class SettingDashboardUsecase implements SettingUsecase<SettingDashboard> {

    private final SettingDashboardRepository repository;

    @Override
    public List<SettingDashboard> all() {
        return null;
    }

    @Override
    public SettingDashboard get(String key) {
        return null;
    }

    @Override
    public void updateAll(List<SettingDashboard> settings) {

    }

    @Override
    public void update(String key, SettingDashboard setting) {

    }
}