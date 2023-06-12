package com.jamesaworo.stocky.core.commandrunner;

import com.jamesaworo.stocky.core.commandrunner.seeders.CompanySeeder;
import com.jamesaworo.stocky.core.commandrunner.seeders.SettingSeeder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * @author Aworo James
 * @since 4/21/23
 */

@Component
public class Runner implements CommandLineRunner {
	private final SettingSeeder settingSeeder;
	private final CompanySeeder companySeeder;

	@Autowired
	public Runner(SettingSeeder settingSeeder, CompanySeeder companySeeder) {
		this.settingSeeder = settingSeeder;
		this.companySeeder = companySeeder;
	}

	@Override
	public void run(String... args) throws Exception {
		settingSeeder.run();
		companySeeder.run();
	}
}