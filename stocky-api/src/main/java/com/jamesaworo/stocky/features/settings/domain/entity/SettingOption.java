package com.jamesaworo.stocky.features.settings.domain.entities;

import lombok.Data;

/**
 * @author Aworo James
 * @since 4/22/23
 */
@Data
public class SettingOption {
    private String optionKey;
    private String optionValue;

    public SettingOption(String optionKey, String optionValue) {
        this.optionKey = optionKey;
        this.optionValue = optionValue;
    }
}