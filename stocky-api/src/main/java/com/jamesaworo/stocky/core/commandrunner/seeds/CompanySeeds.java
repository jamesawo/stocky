package com.jamesaworo.stocky.core.commandrunner.seeds;

import com.jamesaworo.stocky.features.company.domain.entity.CompanyExpensesCategory;

import java.util.List;

/**
 * @author Aworo James
 * @since 6/15/23
 */
public class CompanySeeds {

	// company expenses categories
	public static final List<CompanyExpensesCategory> COMPANY_EXPENSES_CATEGORIES = List.of(
			new CompanyExpensesCategory("FOOD", "EXPENDITURES ON FOOD"),
			new CompanyExpensesCategory("TRANSPORT", "EXPENSES FROM TRANSPORTATION"),
			new CompanyExpensesCategory("FUEL", "EXPENSES FOR FUEL FOR GENERATOR, CAR, ETC"),
			new CompanyExpensesCategory("PURCHASE", "EXPENSES FROM ITEM PURCHASE, IN THIS CASE PROVIDE RECEIPT OR PROOF OF PURCHASE"),
			new CompanyExpensesCategory("MAINTENANCE", "EXPENSES FROM MAINTENANCE COST")
	);

}