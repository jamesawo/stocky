package com.jamesaworo.stocky.features.settings.domain.entity;


import javax.persistence.Entity;
import javax.persistence.Table;

import static com.jamesaworo.stocky.core.constants.Table.SETTING_BACKUP_RESTORE;

@Entity
@Table(name = SETTING_BACKUP_RESTORE)
public class SettingBackUpRestore extends Setting {
    
    public SettingBackUpRestore(SettingObj obj) {
        super(obj);
    }

    public SettingBackUpRestore() {
    }
}
