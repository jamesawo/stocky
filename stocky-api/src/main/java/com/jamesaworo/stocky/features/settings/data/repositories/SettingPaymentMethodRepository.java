package com.jamesaworo.stocky.features.settings.data.repositories;

import com.jamesaworo.stocky.features.settings.domain.entities.SettingPaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Aworo James
 * @since 4/20/23
 */
public interface SettingPaymentMethodRepository extends JpaRepository<SettingPaymentMethod, Long> {
}