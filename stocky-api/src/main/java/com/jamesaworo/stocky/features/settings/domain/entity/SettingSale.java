package com.jamesaworo.stocky.features.settings.domain.entity;


import javax.persistence.Entity;
import javax.persistence.Table;

import static com.jamesaworo.stocky.core.constants.Table.SETTING_SALE;

@Entity
@Table(name = SETTING_SALE)
public class SettingSale extends Setting {

    public SettingSale() {
    }

    public SettingSale(SettingObj obj) {
        super(obj);
    }
}