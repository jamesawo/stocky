package com.jamesaworo.stocky.core.commandrunner.seeds;

import com.jamesaworo.stocky.features.company.domain.entity.*;

import java.util.List;

import static com.jamesaworo.stocky.core.constants.CompanyConstant.*;

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

	public static final List<CompanyBusinessCategory> COMPANY_BUSINESS_CATEGORIES = List.of(
			new CompanyBusinessCategory("BeautySalon"),
			new CompanyBusinessCategory("Baker"),
			new CompanyBusinessCategory("Supermarket"),
			new CompanyBusinessCategory("Restaurant"),
			new CompanyBusinessCategory("ClothingStore"),
			new CompanyBusinessCategory("Pharmacy"),
			new CompanyBusinessCategory("HardwareStore"),
			new CompanyBusinessCategory("JewelryStore"),
			new CompanyBusinessCategory("FitnessCenter"),
			new CompanyBusinessCategory("ElectronicsStore"),
			new CompanyBusinessCategory("Bookstore"),
			new CompanyBusinessCategory("CoffeeShop"),
			new CompanyBusinessCategory("PetStore"),
			new CompanyBusinessCategory("ToyStore"),
			new CompanyBusinessCategory("MusicStore"),
			new CompanyBusinessCategory("HomeDecor Store"),
			new CompanyBusinessCategory("GardenCenter"),
			new CompanyBusinessCategory("AutoRepair Shop"),
			new CompanyBusinessCategory("DentalClinic"),
			new CompanyBusinessCategory("GiftShop"),
			new CompanyBusinessCategory("TyreStore"),
			new CompanyBusinessCategory("Other")

	);

	public static final List<CompanyBasicDetail> COMPANY_BASIC_DETAILS = List.of(
			new CompanyBasicDetail(COMPANY_BUSINESS_NAME, ""),
			new CompanyBasicDetail(COMPANY_BUSINESS_CATEGORY, ""),
			new CompanyBasicDetail(COMPANY_BUSINESS_EMPLOYEE_SIZE, ""),
			new CompanyBasicDetail(COMPANY_BUSINESS_NUMBER_OF_YEARS_OF_OPERATION, ""),
			new CompanyBasicDetail(COMPANY_BUSINESS_NUMBER_OF_BRANCH, ""),
			new CompanyBasicDetail(COMPANY_BUSINESS_ADDRESS, "")
	);

	public static final List<CompanyAdministratorDetail> COMPANY_ADMINISTRATOR_DETAILS = List.of(
			new CompanyAdministratorDetail(COMPANY_PROFILE_NAME, ""),
			new CompanyAdministratorDetail(COMPANY_PROFILE_PHONE, ""),
			new CompanyAdministratorDetail(COMPANY_PROFILE_EMAIL, ""),
			new CompanyAdministratorDetail(COMPANY_PROFILE_POSITION, "")
	);

	public static final List<CompanyLocaleDetail> COMPANY_LOCALE_DETAILS = List.of(
			new CompanyLocaleDetail(COMPANY_LOCALE_CURRENCY, ""),
			new CompanyLocaleDetail(COMPANY_LOCALE_LANGUAGE, ""),
			new CompanyLocaleDetail(COMPANY_LOCALE_TIME_ZONE, "")
	);

}