package com.jamesaworo.stocky.features.settings.data.repositories;

import com.jamesaworo.stocky.features.settings.domain.entities.SettingDashboard;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Aworo James
 * @since 4/20/23
 */
public interface SettingDashboardRepository extends JpaRepository<SettingDashboard, Long> {
}