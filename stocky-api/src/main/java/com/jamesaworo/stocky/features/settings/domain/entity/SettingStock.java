package com.jamesaworo.stocky.features.settings.domain.entity;


import com.jamesaworo.stocky.core.constants.enums.SettingField;

import javax.persistence.Entity;
import javax.persistence.Table;

import static com.jamesaworo.stocky.core.constants.Table.SETTING_STOCK;

@Entity
@Table(name = SETTING_STOCK)
public class SettingStock extends Setting {

    public SettingStock() {
    }

    public SettingStock(String key, String value, SettingField field, String[] options, String title) {
        super(key, value, field, options, title);
    }
}