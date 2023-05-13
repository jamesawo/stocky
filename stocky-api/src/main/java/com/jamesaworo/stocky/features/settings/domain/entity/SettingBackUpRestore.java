package com.jamesaworo.stocky.features.settings.domain.entity;


import com.jamesaworo.stocky.core.constants.enums.SettingField;

import javax.persistence.Entity;
import javax.persistence.Table;

import static com.jamesaworo.stocky.core.constants.Table.SETTING_BACKUP_RESTORE;

@Entity
@Table(name = SETTING_BACKUP_RESTORE)
public class SettingBackUpRestore extends Setting {

    public SettingBackUpRestore(String key, String value, SettingField field, String[] options, String title) {
        super(key, value, field, options, title);
    }

    public SettingBackUpRestore() {
    }
}