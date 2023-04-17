package com.jamesaworo.stocky.features.settings.domain.contracts;

import com.jamesaworo.stocky.features.settings.domain.entities.*;

/**
 * @author Aworo James
 * @since 4/16/23
 */
public interface ISetting {
    public Long getId();

    public void setId(Long id);

    public SettingDashboard getDashboard();

    public void setDashboard(SettingDashboard dashboard);

    public SettingBackRestore getBackRestore();

    public void setBackRestore(SettingBackRestore backRestore);

    public SettingExpenses getExpenses();

    public void setExpenses(SettingExpenses expenses);

    public SettingNotification getNotification();

    public void setNotification(SettingNotification notification);

    public SettingPaymentMethod getPaymentMethod();

    public void setPaymentMethod(SettingPaymentMethod paymentMethod);
}