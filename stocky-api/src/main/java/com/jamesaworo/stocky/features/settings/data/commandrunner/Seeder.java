package com.jamesaworo.stocky.features.settings.data.commandrunner;

import com.jamesaworo.stocky.core.constants.enums.PaymentMethod;
import com.jamesaworo.stocky.features.settings.data.repository.*;
import com.jamesaworo.stocky.features.settings.domain.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.jamesaworo.stocky.core.constants.Global.FALSE;
import static com.jamesaworo.stocky.core.constants.Global.TRUE;
import static com.jamesaworo.stocky.core.constants.Setting.*;
import static com.jamesaworo.stocky.core.constants.enums.SettingField.*;
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
    private final SettingStockRepository stockRepository;

    @Autowired
    public Seeder(SettingBackupRestoreRepository backupRestoreRepository,
                  SettingDashboardRepository dashboardRepository,
                  SettingExpensesRepository expensesRepository,
                  SettingNotificationRepository notificationRepository,
                  SettingPaymentMethodRepository paymentMethodRepository,
                  SettingTaxRepository taxRepository, SettingStockRepository stockRepository) {
        this.backupRestoreRepository = backupRestoreRepository;
        this.dashboardRepository = dashboardRepository;
        this.expensesRepository = expensesRepository;
        this.notificationRepository = notificationRepository;
        this.paymentMethodRepository = paymentMethodRepository;
        this.taxRepository = taxRepository;
        this.stockRepository = stockRepository;
    }


    public void run() {
        this.seedBackupAndRestore();
        this.seedDashboardSetting();
        this.seedExpensesSetting();
        this.seedTaxSetting();
        this.seedPaymentMethod();
        this.seedStockSetting();
    }

    private void seedBackupAndRestore() {
        if (this.backupRestoreRepository.count() == 0) {
            var settings = List.of(
                    new SettingBackUpRestore(SETTING_BACKUP_ENABLE_AUTO_BACK_UP, FALSE, TOGGLE, options(),
                            strip(SETTING_BACKUP_ENABLE_AUTO_BACK_UP))
            );
            this.backupRestoreRepository.saveAll(settings);
            System.out.println("----- seed backup&restore settings -----");
        }
    }

    private void seedDashboardSetting() {
        if (this.dashboardRepository.count() == 0) {
            var settings = List.of(
                    new SettingDashboard(SETTING_DASHBOARD_SHOW_EMPLOYEE_PERFORMANCE, FALSE, TOGGLE, options(),
                            strip(SETTING_DASHBOARD_SHOW_EMPLOYEE_PERFORMANCE)),
                    new SettingDashboard(SETTING_DASHBOARD_SHOW_PRODUCT_PERFORMANCE, FALSE, TOGGLE, options(),
                            strip(SETTING_DASHBOARD_SHOW_PRODUCT_PERFORMANCE))
            );
            this.dashboardRepository.saveAll(settings);
            System.out.println("----- seed dashboard settings -----");
        }
    }

    private void seedExpensesSetting() {
        if (this.expensesRepository.count() == 0) {
            var settings = List.of(
                    new SettingExpenses(SETTING_EXPENSES_ENABLE_EXPENSES_APPROVAL, FALSE, TOGGLE, options(),
                            strip(SETTING_EXPENSES_ENABLE_EXPENSES_APPROVAL))
            );
            this.expensesRepository.saveAll(settings);
            System.out.println("----- seed expenses settings -----");
        }
    }

    private void seedTaxSetting() {
        if (this.taxRepository.count() == 0) {
            var settings = List.of(
                    new SettingTax(SETTING_TAX_ENABLE_TAX, FALSE, TOGGLE, options(), strip(SETTING_TAX_ENABLE_TAX)),
                    new SettingTax(SETTING_TAX_PERCENT_VALUE, "0", INPUT, new String[]{},
                            strip(SETTING_TAX_PERCENT_VALUE))
            );
            this.taxRepository.saveAll(settings);
            System.out.println("----- seed tax settings -----");
        }
    }

    private void seedStockSetting() {
        if (this.stockRepository.count() == 0) {
            var settings = List.of(
                    new SettingStock(SETTING_STOCK_ENABLE_STOCK, FALSE, TOGGLE, options(),
                            strip(SETTING_STOCK_ENABLE_STOCK)),

                    new SettingStock(SETTING_STOCK_BATCH_PREFIX_VALUE, "STK_", INPUT, new String[]{},
                            strip(SETTING_STOCK_BATCH_PREFIX_VALUE)),

                    new SettingStock("TEST_001", "NA", TEXTAREA, new String[]{}, "Test Title Textarea"),
                    new SettingStock("TEST_002", "N/A", SELECT, options(), "TEst Title Select"),
                    new SettingStock("TEST_003", "N/A", RADIO, options(), "Test Title Radio"),
                    new SettingStock("TEST_004", "2022-02-2", DATE, new String[]{}, "Test Title Date")
            );


            this.stockRepository.saveAll(settings);
            System.out.println("----- seed stock settings -----");
        }
    }

    private void seedPaymentMethod() {
        if (this.paymentMethodRepository.count() == 0) {
            var settings = new ArrayList<SettingPaymentMethod>();
            PaymentMethod[] values = PaymentMethod.values();
            stream(values).map(v -> new SettingPaymentMethod(v.name())).forEach(settings::add);
            this.paymentMethodRepository.saveAll(settings);
            System.out.println("----- seed payment method -----");
        }
    }

    private String[] options() {
        return new String[]{TRUE, FALSE};
    }

    private String strip(String input) {
        String[] words = input.split("_");
        return String.join(" ", Arrays.copyOfRange(words, 1, words.length));
    }
}