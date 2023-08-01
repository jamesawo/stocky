package com.jamesaworo.stocky.features.settings.domain.entity;

import lombok.Data;

/**
 * @author Aworo James
 * @since 4/22/23
 */
@Data
public class SettingOption {
    private String optionLabel;
    private String optionValue;

    public SettingOption(String optionLabel, String optionValue) {
        this.optionLabel = optionLabel;
        this.optionValue = optionValue;
    }
}