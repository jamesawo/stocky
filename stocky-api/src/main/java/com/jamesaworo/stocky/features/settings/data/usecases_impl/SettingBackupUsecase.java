package com.jamesaworo.stocky.features.settings.data.usecases_impl;

import com.jamesaworo.stocky.core.annotations.Usecase;
import com.jamesaworo.stocky.features.settings.data.repositories.SettingBackupRestoreRepository;
import com.jamesaworo.stocky.features.settings.domain.entities.SettingBackUpRestore;
import com.jamesaworo.stocky.features.settings.domain.usecases.SettingUsecase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * @author Aworo James
 * @since 4/20/23
 */
@Usecase
@RequiredArgsConstructor
@Slf4j
public class SettingBackupUsecase implements SettingUsecase<SettingBackUpRestore> {

    private final SettingBackupRestoreRepository repository;

    @Override
    public List<SettingBackUpRestore> all() {
        return this.repository.findAll();
    }

    @Override
    public Optional<SettingBackUpRestore> get(String key) {
        return this.repository.findBySettingKey(key);
    }

    @Transactional
    public Boolean updateMany(List<SettingBackUpRestore> settings) {
        try {
            settings.forEach(s -> this.update(s.getSettingKey(), s.getSettingValue()));
            return true;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return false;
        }
    }

    @Transactional
    public Boolean update(String key, String value) {
        var optionalSetting = this.get(key);
        return optionalSetting.map(e -> {
            var updated = this.repository.updateByKey(key, value);
            return updated == 1;
        }).orElse(false);
    }
}