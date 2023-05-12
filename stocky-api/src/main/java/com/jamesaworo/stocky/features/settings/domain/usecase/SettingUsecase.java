package com.jamesaworo.stocky.features.settings.domain.usecase;

import java.util.List;
import java.util.Optional;

/**
 * @author Aworo James
 * @since 4/20/23
 */
public interface SettingUsecase<T> {
    List<T> all();

    Optional<T> get(String key);

    Boolean updateMany(List<T> settings);

    Boolean update(String key, String value);
}