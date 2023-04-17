package com.jamesaworo.stocky.features.settings.domain.entities;


import javax.persistence.*;

import static com.jamesaworo.stocky.core.constants.DatabaseTable.SETTING_BACKUP_RESTORE;

@Entity
@Table(name = SETTING_BACKUP_RESTORE)
public class SettingBackRestore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean enableBackup;

    private Boolean enableRestore;

}