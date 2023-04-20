package com.jamesaworo.stocky.features.settings.data.usecases_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.settings.data.repositories.SettingNotificationRepository;
import com.jamesaworo.stocky.features.settings.domain.entities.SettingNotification;
import com.jamesaworo.stocky.features.settings.domain.usecases.SettingUsecase;
import lombok.RequiredArgsConstructor;

import java.util.List;

/**
 * @author Aworo James
 * @since 4/20/23
 */
@Usecase
@RequiredArgsConstructor
public class SettingNotificationUsecase implements SettingUsecase<SettingNotification> {

    private final SettingNotificationRepository repository;

    @Override
    public List<SettingNotification> all() {
        return null;
    }

    @Override
    public SettingNotification get(String key) {
        return null;
    }

    @Override
    public void updateAll(List<SettingNotification> settings) {

    }

    @Override
    public void update(String key, SettingNotification setting) {

    }
}