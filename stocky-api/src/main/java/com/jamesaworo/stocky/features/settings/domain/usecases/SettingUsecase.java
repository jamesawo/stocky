package com.jamesaworo.stocky.features.settings.domain.usecases;

import java.util.List;

/**
 * @author Aworo James
 * @since 4/20/23
 */
public interface SettingUsecase<T> {
    List<T> all();

    T get(String key);

    void updateAll(List<T> settings);

    void update(String key, T setting);
}