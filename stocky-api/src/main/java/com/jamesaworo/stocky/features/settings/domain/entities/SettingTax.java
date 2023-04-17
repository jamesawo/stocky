package com.jamesaworo.stocky.features.settings.domain.entities;


import javax.persistence.*;

import static com.jamesaworo.stocky.core.constants.DatabaseTable.SETTING_TAX;

@Entity
@Table(name = SETTING_TAX)
public class SettingTax {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int taxPercent;

    private Boolean useFixedTaxPercent;
}