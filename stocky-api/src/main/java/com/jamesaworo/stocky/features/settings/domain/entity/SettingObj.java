/*
 * @Author: james.junior
 * @Date: 7/14/23 10:16
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.features.settings.domain.entity;


import com.jamesaworo.stocky.core.constants.enums.SettingField;
import com.jamesaworo.stocky.features.settings.domain.enums.SettingModule;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Setter
@Getter
public class SettingObj {
    Long id;
    String key;
    String value;
    SettingField field;
    Map<String, String> options;
    String title;
    String hint;
    SettingModule module;
}
