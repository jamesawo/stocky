package com.jamesaworo.stocky.features.settings.domain.entity;


import com.jamesaworo.stocky.core.constants.enums.SettingField;

import javax.persistence.Entity;
import javax.persistence.Table;

import static com.jamesaworo.stocky.core.constants.Table.SETTING_NOTIFICATION;

@Entity
@Table(name = SETTING_NOTIFICATION)
public class SettingNotification extends Setting {

    public SettingNotification() {
    }

    public SettingNotification(String key, String value, SettingField field, String[] options, String title) {
        super(key, value, field, options, title);
    }
}