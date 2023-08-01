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

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
public class SettingObj {
    Long id;
    String key;
    String value;
    SettingField field;
    //Map<String, String> options = new HashMap<>();
    List<SettingOption> options = new ArrayList<>();
    String title;
    String hint;
    SettingModule module;

    public SettingObj() {
    }

    public SettingObj(String key, String value, SettingField field, String title, SettingModule module) {
        this.key = key;
        this.value = value;
        this.field = field;
        this.title = title;
        this.module = module;
    }

    public SettingObj(String key, String value, SettingField field, String title, SettingModule module, String hint) {
        this.key = key;
        this.value = value;
        this.field = field;
        this.hint = hint;
        this.module = module;
        this.title = title;
    }

    public SettingObj(
            String key,
            String value,
            SettingField field,
            String title,
            SettingModule module,
            String hint,
            List<SettingOption> options
    ) {
        this.key = key;
        this.value = value;
        this.field = field;
        this.hint = hint;
        this.module = module;
        this.title = title;
        this.options = options;
    }


}
