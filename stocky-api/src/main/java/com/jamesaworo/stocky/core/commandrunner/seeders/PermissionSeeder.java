/*
 * @Author: james.junior
 * @Date: 6/13/23 17:25
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.core.commandrunner.seeders;

import com.jamesaworo.stocky.features.authentication.data.repository.PermissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import static com.jamesaworo.stocky.core.commandrunner.seeds.PermissionSeeds.*;

@Component
@RequiredArgsConstructor
public class PermissionSeeder {
	private final PermissionRepository permissionRepository;

	public void run() {
		if (this.permissionRepository.count() == 0) {
			runCompanyPermissionSeeder();
			runPaywallPermissionSeeder();
			runProductPermissionSeeder();
			runReportPermissionSeeder();
			runSalePermissionSeeder();
			runSettingsPermissionSeeder();
			runStockPermissionSeeder();
		}

	}

	private void runCompanyPermissionSeeder() {
		this.permissionRepository.saveAll(COMPANY_PERMISSIONS);
		System.out.println("----- seed company permission  -----");
	}

	private void runPaywallPermissionSeeder() {
		this.permissionRepository.saveAll(PAYWALL_PERMISSIONS);
		System.out.println("----- seed paywall permission  -----");
	}

	private void runProductPermissionSeeder() {
		this.permissionRepository.saveAll(PRODUCT_PERMISSIONS);
		System.out.println("----- seed product permission  -----");
	}

	private void runReportPermissionSeeder() {
		this.permissionRepository.saveAll(REPORT_PERMISSIONS);
		System.out.println("----- seed report permission  -----");
	}

	private void runSalePermissionSeeder() {
		this.permissionRepository.saveAll(SALE_PERMISSIONS);
		System.out.println("----- seed sale permission  -----");
	}

	private void runSettingsPermissionSeeder() {
		this.permissionRepository.saveAll(SETTING_PERMISSIONS);
		System.out.println("----- seed settings permission  -----");
	}

	private void runStockPermissionSeeder() {
		this.permissionRepository.saveAll(STOCK_PERMISSIONS);
		System.out.println("----- seed stock permission  -----");
	}


}
