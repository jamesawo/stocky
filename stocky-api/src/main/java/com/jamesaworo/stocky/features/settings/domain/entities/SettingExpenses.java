package com.jamesaworo.stocky.features.settings.domain.entities;


import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

import static com.jamesaworo.stocky.core.constants.DatabaseTable.SETTING_EXPENSES;

@Entity
@Table(name = SETTING_EXPENSES)
@Builder
@Data
public class SettingExpenses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean enableRequestAndApprove;


}