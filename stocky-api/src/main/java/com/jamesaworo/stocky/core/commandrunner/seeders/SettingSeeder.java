package com.jamesaworo.stocky.core.commandrunner.seeders;

import com.jamesaworo.stocky.core.constants.enums.PaymentMethod;
import com.jamesaworo.stocky.features.settings.data.repository.*;
import com.jamesaworo.stocky.features.settings.domain.entity.SettingPaymentMethod;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

import static com.jamesaworo.stocky.core.commandrunner.seeds.SettingsSeeds.*;
import static java.util.Arrays.stream;

/**
 * @author Aworo James
 * @since 4/21/23
 */
@Component
@RequiredArgsConstructor
public class SettingSeeder {

	private final SettingBackupRestoreRepository backupRestoreRepository;
	private final SettingDashboardRepository dashboardRepository;
	private final SettingExpensesRepository expensesRepository;
	private final SettingNotificationRepository notificationRepository;
	private final SettingPaymentMethodRepository paymentMethodRepository;
	private final SettingTaxRepository taxRepository;
	private final SettingStockRepository stockRepository;
	private final SettingPeopleRepository peopleRepository;
	private final SettingProductRepository productRepository;
	private final SettingSaleRepository saleRepository;


	public void run() {
		this.seedBackupAndRestore();
		this.seedDashboardSetting();
		this.seedExpensesSetting();
		this.seedTaxSetting();
		this.seedPaymentMethod();
		this.seedStockSetting();
		this.seedPeopleSetting();
		this.seedProductSetting();
		this.seedSaleSetting();
	}


	private void seedBackupAndRestore() {
		if (this.backupRestoreRepository.count() == 0) {
			this.backupRestoreRepository.saveAll(SETTING_BACK_UP_RESTORES);
			System.out.println("----- seed backup&restore settings -----");
		}
	}

	private void seedDashboardSetting() {
		if (this.dashboardRepository.count() == 0) {
			this.dashboardRepository.saveAll(SETTING_DASHBOARDS);
			System.out.println("----- seed dashboard settings -----");
		}
	}

	private void seedExpensesSetting() {
		if (this.expensesRepository.count() == 0) {
			this.expensesRepository.saveAll(SETTING_EXPENSES);
			System.out.println("----- seed expenses settings -----");
		}
	}

	private void seedTaxSetting() {
		if (this.taxRepository.count() == 0) {
			this.taxRepository.saveAll(SETTING_TAXES);
			System.out.println("----- seed tax settings -----");
		}
	}

	private void seedStockSetting() {
		if (this.stockRepository.count() == 0) {
			this.stockRepository.saveAll(SETTING_STOCKS);
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

	private void seedPeopleSetting() {
		if (this.peopleRepository.count() == 0) {
			this.peopleRepository.saveAll(SETTING_PEOPLE);
			System.out.println("----- seed people setting -----");
		}
	}

	private void seedProductSetting() {
		if (this.productRepository.count() == 0) {
			this.productRepository.saveAll(SETTING_PRODUCTS);
			System.out.println("----- seed product setting -----");
		}
	}

	private void seedSaleSetting() {
		if (this.saleRepository.count() == 0) {
			this.saleRepository.saveAll(SETTING_SALES);
			System.out.println("----- seed sale setting -----");
		}
	}


}