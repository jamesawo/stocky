package com.jamesaworo.stocky.features.settings.data.datasource;

import com.jamesaworo.stocky.core.enumconstants.PaymentMethod;
import com.jamesaworo.stocky.features.settings.data.repositories.*;
import com.jamesaworo.stocky.features.settings.domain.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

import static com.jamesaworo.stocky.core.constants.GlobalConst.NO;
import static com.jamesaworo.stocky.core.constants.GlobalConst.YES;
import static com.jamesaworo.stocky.core.constants.SettingConst.*;
import static com.jamesaworo.stocky.core.enumconstants.SettingField.INPUT;
import static com.jamesaworo.stocky.core.enumconstants.SettingField.TOGGLE;
import static java.util.Arrays.stream;

/**
 * @author Aworo James
 * @since 4/21/23
 */
@Component
public class Seeder {

    private final SettingBackupRestoreRepository backupRestoreRepository;
    private final SettingDashboardRepository dashboardRepository;
    private final SettingExpensesRepository expensesRepository;
    private final SettingNotificationRepository notificationRepository;
    private final SettingPaymentMethodRepository paymentMethodRepository;
    private final SettingTaxRepository taxRepository;

    @Autowired
    public Seeder(SettingBackupRestoreRepository backupRestoreRepository,
                  SettingDashboardRepository dashboardRepository,
                  SettingExpensesRepository expensesRepository,
                  SettingNotificationRepository notificationRepository,
                  SettingPaymentMethodRepository paymentMethodRepository,
                  SettingTaxRepository taxRepository) {
        this.backupRestoreRepository = backupRestoreRepository;
        this.dashboardRepository = dashboardRepository;
        this.expensesRepository = expensesRepository;
        this.notificationRepository = notificationRepository;
        this.paymentMethodRepository = paymentMethodRepository;
        this.taxRepository = taxRepository;
    }

    public void run() {
        System.out.println("-----seeding-----");
        this.seedBackupAndRestore();
        this.seedDashboardSetting();
        this.seedExpensesSetting();
        this.seedTaxSetting();
        this.seedPaymentMethod();
        System.out.println("-----seeded-----");
    }

    private void seedBackupAndRestore() {
        if (this.backupRestoreRepository.count() == 0) {
            var settings = List.of(
                    new SettingBackUpRestore(ENABLE_AUTO_BACK_UP, NO, TOGGLE, getToggleOptions())
            );
            this.backupRestoreRepository.saveAll(settings);
        }
    }

    private void seedDashboardSetting() {
        if (this.dashboardRepository.count() == 0) {
            var settings = List.of(
                    new SettingDashboard(SHOW_EMPLOYEE_PERFORMANCE, NO, TOGGLE, getToggleOptions()),
                    new SettingDashboard(SHOW_PRODUCT_PERFORMANCE, NO, TOGGLE, getToggleOptions())
            );
            this.dashboardRepository.saveAll(settings);
        }
    }

    private void seedExpensesSetting() {
        if (this.expensesRepository.count() == 0) {
            var settings = List.of(
                    new SettingExpenses(ENABLE_EXPENSES_APPROVAL, NO, TOGGLE, getToggleOptions())
            );
            this.expensesRepository.saveAll(settings);
        }
    }

    private void seedTaxSetting() {
        if (this.taxRepository.count() == 0) {
            var settings = List.of(
                    new SettingTax(ENABLE_TAX, NO, TOGGLE, getToggleOptions()),
                    new SettingTax(ENABLE_TAX_VALUE, "0", INPUT, new String[]{})
            );
            this.taxRepository.saveAll(settings);
        }
    }

    private void seedPaymentMethod() {
        if (this.paymentMethodRepository.count() == 0) {
            var settings = new ArrayList<SettingPaymentMethod>();
            PaymentMethod[] values = PaymentMethod.values();
            stream(values).map(v -> new SettingPaymentMethod(v.name())).forEach(settings::add);
            this.paymentMethodRepository.saveAll(settings);
        }
    }


    private String[] getToggleOptions() {
        return new String[]{YES, NO};
    }
}