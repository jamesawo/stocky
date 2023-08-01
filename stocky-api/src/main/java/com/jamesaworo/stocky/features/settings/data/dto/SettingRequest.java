package com.jamesaworo.stocky.features.settings.data.dto;

import com.jamesaworo.stocky.core.constants.enums.SettingField;
import com.jamesaworo.stocky.features.settings.domain.entity.Setting;
import com.jamesaworo.stocky.features.settings.domain.entity.SettingOption;
import com.jamesaworo.stocky.features.settings.domain.enums.SettingModule;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Collection;

/**
 * @author Aworo James
 * @since 4/21/23
 */
@Data
@Builder
@AllArgsConstructor
public class SettingRequest {
    private Long id;
    private String settingKey;
    private String settingValue;
    private SettingField settingField;
    private String settingTitle;
    private Collection<SettingOption> settingOptions;
    private String settingHint;
    private SettingModule settingModule;

    public SettingRequest(String settingKey, String settingValue) {
        this.settingKey = settingKey;
        this.settingValue = settingValue;
    }

    public SettingRequest() {
    }

    public static SettingRequest fromModel(Setting model) {
        return new SettingRequest(model.getSettingKey(), model.getSettingValue());
    }
}