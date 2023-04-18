package com.jamesaworo.stocky.features.settings.domain.entities;


import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

import static com.jamesaworo.stocky.core.constants.DatabaseTable.SETTING_PAYMENT_METHOD;

@Entity
@Table(name = SETTING_PAYMENT_METHOD)
@Builder
@Data
public class SettingPaymentMethod extends Setting {

}