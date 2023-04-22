package com.jamesaworo.stocky.features.settings.data.dto;

import com.jamesaworo.stocky.core.enumconstants.SettingField;
import com.jamesaworo.stocky.features.settings.domain.entities.SettingOption;
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
public class SettingDto {
    private Long id;
    private String settingKey;
    private String settingValue;
    private SettingField settingField;
    private Collection<SettingOption> settingOptions;
    
    public SettingDto() {
    }
}