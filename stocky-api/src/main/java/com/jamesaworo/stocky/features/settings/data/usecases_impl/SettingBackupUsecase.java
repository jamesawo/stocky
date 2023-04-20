package com.jamesaworo.stocky.features.settings.data.usecases_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.settings.data.repositories.SettingBackupRestoreRepository;
import com.jamesaworo.stocky.features.settings.domain.entities.SettingBackUpRestore;
import com.jamesaworo.stocky.features.settings.domain.usecases.SettingUsecase;
import lombok.RequiredArgsConstructor;

import java.util.List;

/**
 * @author Aworo James
 * @since 4/20/23
 */
@Usecase
@RequiredArgsConstructor
public class SettingBackupUsecase implements SettingUsecase<SettingBackUpRestore> {

    private final SettingBackupRestoreRepository repository;

    @Override
    public List<SettingBackUpRestore> all() {
        return null;
    }

    @Override
    public SettingBackUpRestore get(String key) {
        return null;
    }

    @Override
    public void updateAll(List<SettingBackUpRestore> settings) {
    }

    @Override
    public void update(String key, SettingBackUpRestore setting) {

    }
}