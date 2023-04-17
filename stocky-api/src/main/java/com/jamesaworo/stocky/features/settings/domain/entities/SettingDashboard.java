package com.jamesaworo.stocky.features.settings.domain.entities;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

import static com.jamesaworo.stocky.core.constants.DatabaseTable.SETTING_DASHBOARD;

@Entity
@Table(name = SETTING_DASHBOARD)
@Builder
@Data
public class SettingDashboard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


}