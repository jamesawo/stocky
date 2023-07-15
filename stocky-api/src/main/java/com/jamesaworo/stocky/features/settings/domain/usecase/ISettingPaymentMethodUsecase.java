package com.jamesaworo.stocky.features.settings.domain.usecase;

import com.jamesaworo.stocky.features.settings.domain.entity.SettingPaymentMethod;

import java.util.List;
import java.util.Optional;

/**
 * @author Aworo James
 * @since 4/22/23
 */
public interface ISettingPaymentMethodUsecase extends ISettingUsecase<SettingPaymentMethod> {

    List<SettingPaymentMethod> all();

    Optional<SettingPaymentMethod> get(String key);

    Optional<SettingPaymentMethod> getById(Long id);
}