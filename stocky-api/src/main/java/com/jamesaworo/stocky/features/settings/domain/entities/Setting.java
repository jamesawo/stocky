package com.jamesaworo.stocky.features.settings.domain.entities;

import com.jamesaworo.stocky.features.settings.domain.contracts.ISetting;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

import static com.jamesaworo.stocky.core.constants.DatabaseTable.SETTING;

@Entity
@Table(name = SETTING)
@Builder
@Data
public class Setting implements ISetting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private SettingDashboard dashboard;

    @OneToOne
    private SettingBackRestore backRestore;

    @OneToOne
    private SettingExpenses expenses;

    @OneToOne
    private SettingNotification notification;

    @OneToOne
    private SettingPaymentMethod paymentMethod;


}