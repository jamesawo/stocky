package com.jamesaworo.stocky.features.settings.domain.entities;


import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

import static com.jamesaworo.stocky.core.constants.DatabaseTable.SETTING_NOTIFICATION;

@Entity
@Table(name = SETTING_NOTIFICATION)
@Builder
@Data
public class SettingNotification extends  Setting{

}