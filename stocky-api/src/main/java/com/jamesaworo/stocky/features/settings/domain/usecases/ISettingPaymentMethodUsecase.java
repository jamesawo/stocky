package com.jamesaworo.stocky.features.settings.domain.usecases;

import com.jamesaworo.stocky.features.settings.domain.entities.SettingPaymentMethod;

import java.util.List;
import java.util.Optional;

/**
 * @author Aworo James
 * @since 4/22/23
 */
public interface ISettingPaymentMethodUsecase {

    List<SettingPaymentMethod> all();

    Optional<SettingPaymentMethod> get(String key);

    Optional<SettingPaymentMethod> getById(Long id);
}