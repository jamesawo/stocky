package com.jamesaworo.stocky.features.settings.domain.entity;


import com.jamesaworo.stocky.core.constants.enums.SettingField;

import javax.persistence.Entity;
import javax.persistence.Table;

import static com.jamesaworo.stocky.core.constants.Table.SETTING_EXPENSES;

@Entity
@Table(name = SETTING_EXPENSES)
public class SettingExpenses extends Setting {

    public SettingExpenses() {
    }

    public SettingExpenses(String key, String value, SettingField field, String[] options) {
        super(key, value, field, options);
    }
}