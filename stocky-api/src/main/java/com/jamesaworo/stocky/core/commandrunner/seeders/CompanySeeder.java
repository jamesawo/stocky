/*
 * @Author: james.junior
 * @Date: 6/12/23 15:00
 *
 * @Project: stocky-api
 */

package com.jamesaworo.stocky.core.commandrunner.seeders;

import com.jamesaworo.stocky.features.company.data.repository.CompanyExpensesCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import static com.jamesaworo.stocky.core.commandrunner.seeds.CompanySeeds.COMPANY_EXPENSES_CATEGORIES;

@Component
@RequiredArgsConstructor
public class CompanySeeder {
	private final CompanyExpensesCategoryRepository companyExpensesCategoryRepository;

	public void run() {
		this.runCompanyExpensesCategorySeeder();

	}

	private void runCompanyExpensesCategorySeeder() {
		if (this.companyExpensesCategoryRepository.count() == 0) {
			this.companyExpensesCategoryRepository.saveAll(COMPANY_EXPENSES_CATEGORIES);
			System.out.println("----- seed company expenses category -----");
		}
	}

}
