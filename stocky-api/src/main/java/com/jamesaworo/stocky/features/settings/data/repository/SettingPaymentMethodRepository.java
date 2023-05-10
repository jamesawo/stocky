package com.jamesaworo.stocky.features.settings.data.repositories;

import com.jamesaworo.stocky.features.settings.domain.entities.SettingPaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author Aworo James
 * @since 4/20/23
 */
public interface SettingPaymentMethodRepository extends JpaRepository<SettingPaymentMethod, Long> {
    Optional<SettingPaymentMethod> findByTitle(String title);
}