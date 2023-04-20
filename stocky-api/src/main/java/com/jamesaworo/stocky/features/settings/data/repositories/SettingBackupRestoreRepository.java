package com.jamesaworo.stocky.features.settings.data.repositories;

import com.jamesaworo.stocky.features.settings.domain.entities.SettingBackUpRestore;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Aworo James
 * @since 4/20/23
 */
public interface SettingBackupRestoreRepository extends JpaRepository<SettingBackUpRestore, Long> {
}