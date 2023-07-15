package com.jamesaworo.stocky.features.settings.data.repository;

import com.jamesaworo.stocky.features.settings.domain.entity.SettingStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

/**
 * @author Aworo James
 * @since 4/20/23
 */
@Repository
public interface SettingStockRepository extends JpaRepository<SettingStock, Long> {
    Optional<SettingStock> findBySettingKey(String key);

    @Transactional
    @Modifying
    @Query(value = "UPDATE SettingStock s SET s.settingValue = :value where s.settingKey = :key")
    int updateByKey(String key, String value);
}