package com.jamesaworo.stocky.features.settings.domain.entities;


import com.jamesaworo.stocky.core.enumconstants.SettingField;

import javax.persistence.Entity;
import javax.persistence.Table;

import static com.jamesaworo.stocky.core.constants.DatabaseTable.SETTING_NOTIFICATION;

@Entity
@Table(name = SETTING_NOTIFICATION)
public class SettingNotification extends Setting {

    public SettingNotification() {
    }

    public SettingNotification(String key, String value, SettingField field, String[] options) {
        super(key, value, field, options);
    }
}