/*
 * @Author: james.junior
 * @Date: 6/12/23 15:00
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.core.commandrunner.seeders;

import com.jamesaworo.stocky.features.company.data.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import static com.jamesaworo.stocky.core.commandrunner.seeds.CompanySeeds.*;

@Component
@RequiredArgsConstructor
public class CompanySeeder {
	private final CompanyExpensesCategoryRepository companyExpensesCategoryRepository;
	private final CompanyBusinessCategoryRepository companyBusinessCategoryRepository;
	private final CompanyBasicDetailRepository companyBasicDetailRepository;
	private final CompanyAdministratorDetailRepository companyAdministratorDetailRepository;
	private final CompanyRegionDetailRepository companyLocaleDetailRepository;


	public void run() {
		this.runCompanyExpensesCategorySeeder();
		this.runCompanyBusinessCategorySeeder();
		this.runCompanyBasicDetailsSeeder();
		this.runCompanyAdminDetailsSeeder();
		this.runCompanyLocaleDetailsSeeder();

	}

	private void runCompanyExpensesCategorySeeder() {
		if (this.companyExpensesCategoryRepository.count() == 0) {
			this.companyExpensesCategoryRepository.saveAll(COMPANY_EXPENSES_CATEGORIES);
			System.out.println("----- seed company expenses categories -----");
		}
	}

	private void runCompanyBusinessCategorySeeder() {
		if (companyBusinessCategoryRepository.count() == 0) {
			this.companyBusinessCategoryRepository.saveAll(COMPANY_BUSINESS_CATEGORIES);
			System.out.println("----- seed company business categories -----");
		}
	}

	private void runCompanyBasicDetailsSeeder() {
		if (companyBasicDetailRepository.count() == 0) {
			this.companyBasicDetailRepository.saveAll(COMPANY_BASIC_DETAILS);
			System.out.println("----- seed company basic setup keys -----");
		}

	}

	private void runCompanyAdminDetailsSeeder() {
		if (companyAdministratorDetailRepository.count() == 0) {
			this.companyAdministratorDetailRepository.saveAll(COMPANY_ADMINISTRATOR_DETAILS);
			System.out.println("----- seed company admin setup keys  -----");
		}
	}

	private void runCompanyLocaleDetailsSeeder() {
		if (companyLocaleDetailRepository.count() == 0) {
			this.companyLocaleDetailRepository.saveAll(COMPANY_LOCALE_DETAILS);
			System.out.println("----- seed company region setup keys -----");
		}
	}
}
