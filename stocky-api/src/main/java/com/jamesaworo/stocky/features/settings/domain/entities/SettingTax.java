package com.jamesaworo.stocky.features.settings.domain.entities;


import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

import static com.jamesaworo.stocky.core.constants.DatabaseTable.SETTING_TAX;

@Entity
@Table(name = SETTING_TAX)
@Data
@Builder
public class SettingTax extends Setting {

}