package com.jamesaworo.stocky.features.settings.domain.entities;


import com.jamesaworo.stocky.core.enumconstants.SettingField;

import javax.persistence.Entity;
import javax.persistence.Table;

import static com.jamesaworo.stocky.core.constants.DatabaseTable.SETTING_BACKUP_RESTORE;

@Entity
@Table(name = SETTING_BACKUP_RESTORE)
public class SettingBackUpRestore extends Setting {

    public SettingBackUpRestore(String key, String value, SettingField field, String[] options) {
        super(key, value, field, options);
    }

    public SettingBackUpRestore() {
    }
}