package com.jamesaworo.stocky.features.settings.domain.entities;


import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

import java.util.Map;

import static com.jamesaworo.stocky.core.constants.DatabaseTable.SETTING_BACKUP_RESTORE;

@Entity
@Table(name = SETTING_BACKUP_RESTORE)
@Data
@Builder
public class SettingBackUpRestore extends Setting {

}