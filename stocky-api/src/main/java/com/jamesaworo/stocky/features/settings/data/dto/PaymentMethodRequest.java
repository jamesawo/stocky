package com.jamesaworo.stocky.features.settings.data.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author Aworo James
 * @since 4/22/23
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class PaymentMethodRequest extends SettingRequest {
    private Long id;
    private String title;
    private String description;

    public PaymentMethodRequest() {
    }
}