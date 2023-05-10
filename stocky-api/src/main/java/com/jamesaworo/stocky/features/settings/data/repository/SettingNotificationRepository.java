package com.jamesaworo.stocky.features.settings.data.repositories;

import com.jamesaworo.stocky.features.settings.domain.entities.SettingNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.Optional;

/**
 * @author Aworo James
 * @since 4/20/23
 */
public interface SettingNotificationRepository extends JpaRepository<SettingNotification, Long> {
    Optional<SettingNotification> findBySettingKey(String key);

    @Transactional
    @Modifying
    @Query(value = "UPDATE SettingNotification s SET settingValue = :value where s.settingKey = :key")
    int updateByKey(String key, String value);
}