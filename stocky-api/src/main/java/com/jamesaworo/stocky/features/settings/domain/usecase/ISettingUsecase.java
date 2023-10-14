package com.jamesaworo.stocky.features.settings.domain.usecase;

import com.jamesaworo.stocky.core.constants.Setting;

import java.util.List;
import java.util.Optional;

/**
 * @author Aworo James
 * @since 4/20/23
 */
public interface ISettingUsecase<T> {
    List<T> all();

    Optional<T> get(String key);

    Boolean updateMany(List<T> settings);

    Boolean update(String key, String value);

    default Boolean getAsBool(String key) {
        Optional<T> settingStock = get(key);

        return settingStock.map(value -> {
            var setting = (com.jamesaworo.stocky.features.settings.domain.entity.Setting) value;
            return setting.getSettingValue().equalsIgnoreCase(Setting.TRUE);
        }).orElse(Boolean.FALSE);
    }
}