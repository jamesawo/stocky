package com.jamesaworo.stocky.features.settings.data.repository;

import com.jamesaworo.stocky.features.settings.domain.entity.SettingBackUpRestore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

/**
 * @author Aworo James
 * @since 4/20/23
 */
public interface SettingBackupRestoreRepository extends JpaRepository<SettingBackUpRestore, Long> {
    Optional<SettingBackUpRestore> findBySettingKey(String key);

    @Modifying
    @Query(value = "UPDATE SettingBackUpRestore s SET s.settingValue = :value where s.settingKey = :key")
    int updateByKey(String key, String value);
}