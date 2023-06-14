package com.jamesaworo.stocky.core.commandrunner.seeds;

import com.jamesaworo.stocky.features.settings.domain.entity.*;

import java.util.Arrays;
import java.util.List;

import static com.jamesaworo.stocky.core.constants.Global.FALSE;
import static com.jamesaworo.stocky.core.constants.Global.TRUE;
import static com.jamesaworo.stocky.core.constants.Setting.*;
import static com.jamesaworo.stocky.core.constants.enums.SettingField.INPUT;
import static com.jamesaworo.stocky.core.constants.enums.SettingField.TOGGLE;
import static java.util.List.of;

/**
 * @author Aworo James
 * @since 5/14/23
 */
public class SettingsSeeds {

	// backup and restore
	public static final List<SettingBackUpRestore> SETTING_BACK_UP_RESTORES = List.of(
			new SettingBackUpRestore(SETTING_BACKUP_ENABLE_AUTO_BACK_UP, FALSE, TOGGLE, new String[] { },
			                         strip(SETTING_BACKUP_ENABLE_AUTO_BACK_UP)
			)
	);

	// dashboard
	public static final List<SettingDashboard> SETTING_DASHBOARDS = List.of(
			new SettingDashboard(SETTING_DASHBOARD_SHOW_EMPLOYEE_PERFORMANCE, FALSE, TOGGLE, new String[] { },
			                     strip(SETTING_DASHBOARD_SHOW_EMPLOYEE_PERFORMANCE)
			),
			new SettingDashboard(SETTING_DASHBOARD_SHOW_PRODUCT_PERFORMANCE, FALSE, TOGGLE, new String[] { },
			                     strip(SETTING_DASHBOARD_SHOW_PRODUCT_PERFORMANCE)
			)
	);

	// expenses
	public static final List<SettingExpenses> SETTING_EXPENSES = List.of(
			new SettingExpenses(SETTING_EXPENSES_ENABLE_EXPENSES_APPROVAL, FALSE, TOGGLE, new String[] { },
			                    strip(SETTING_EXPENSES_ENABLE_EXPENSES_APPROVAL)
			)
	);

	// tax
	public static final List<SettingTax> SETTING_TAXES = List.of(
			new SettingTax(SETTING_TAX_ENABLE_TAX, FALSE, TOGGLE, new String[] { }, strip(SETTING_TAX_ENABLE_TAX)),
			new SettingTax(SETTING_TAX_PERCENT_VALUE, "0", INPUT, new String[] { },
			               strip(SETTING_TAX_PERCENT_VALUE)
			)
	);

	// people
	public static final List<SettingPeople> SETTING_PEOPLE = List.of(
			new SettingPeople(SETTING_PEOPLE_SHOW_EMPLOYEE_SALES_PERFORMANCE, FALSE, TOGGLE, new String[] { },
			                  strip(SETTING_PEOPLE_SHOW_EMPLOYEE_SALES_PERFORMANCE)
			),
			new SettingPeople(SETTING_PEOPLE_SHOW_EMPLOYEE_SHIFT, FALSE, TOGGLE, new String[] { },
			                  strip(SETTING_PEOPLE_SHOW_EMPLOYEE_SHIFT)
			),
			new SettingPeople(SETTING_PEOPLE_SHOW_EMPLOYEE_PROFIT_PERFORMANCE, FALSE, TOGGLE, new String[] { },
			                  strip(SETTING_PEOPLE_SHOW_EMPLOYEE_PROFIT_PERFORMANCE)
			),
			new SettingPeople(SETTING_PEOPLE_SHOW_TOTAL_CUSTOMER_STATS, FALSE, TOGGLE, new String[] { },
			                  strip(SETTING_PEOPLE_SHOW_TOTAL_CUSTOMER_STATS)
			)
	);


	// stock
	public static final List<SettingStock> SETTING_STOCKS = of(
			new SettingStock(SETTING_STOCK_ENABLE_STOCK, FALSE, TOGGLE, new String[] { },
			                 strip(SETTING_STOCK_ENABLE_STOCK)
			),
			new SettingStock(SETTING_STOCK_BATCH_PREFIX_VALUE, "STK_", INPUT, new String[] { },
			                 strip(SETTING_STOCK_BATCH_PREFIX_VALUE)
			),
			new SettingStock(SETTING_STOCK_SHOW_STOCK_COUNT, FALSE, TOGGLE, new String[] { },
			                 strip(SETTING_STOCK_SHOW_STOCK_COUNT)
			),
			new SettingStock(SETTING_STOCK_SHOW_OUT_OF_STOCK_ITEM, FALSE, TOGGLE, new String[] { },
			                 strip(SETTING_STOCK_SHOW_OUT_OF_STOCK_ITEM)
			),
			new SettingStock(SETTING_STOCK_SHOW_LOW_INVENTORY_WARNING, FALSE, TOGGLE, new String[] { },
			                 strip(SETTING_STOCK_SHOW_LOW_INVENTORY_WARNING)
			),
			new SettingStock(SETTING_STOCK_SHOW_DAMAGED_STOCK_ITEM, FALSE, TOGGLE, new String[] { },
			                 strip(SETTING_STOCK_SHOW_DAMAGED_STOCK_ITEM)
			)
	);

	// product
	public static final List<SettingProduct> SETTING_PRODUCTS = of(
			new SettingProduct(SETTING_PRODUCT_ENABLE_PRODUCT_BUNDLE, FALSE, TOGGLE, new String[] { },
			                   strip(SETTING_PRODUCT_ENABLE_PRODUCT_BUNDLE),
			                   "ALLOW PRODUCTS AND/OR SERVICES TO BE BUNDLED TOGETHER AND CHARGED AS ONE UNIT"
			),

			new SettingProduct(SETTING_PRODUCT_SHOW_PRODUCT_BUNDLE_BREAKDOWN_IN_RECEIPT, FALSE, TOGGLE, new String[] { },
			                   strip(SETTING_PRODUCT_SHOW_PRODUCT_BUNDLE_BREAKDOWN_IN_RECEIPT),
			                   "SHOULD SHOW THE BREAKDOWN OF BUNDLED PRODUCTS IN THE CUSTOMERS RECEIPT"
			),

			new SettingProduct(SETTING_PRODUCT_ALLOW_TO_SELL_BUNDLED_PRODUCT_ALONE, FALSE, TOGGLE, new String[] { },
			                   strip(SETTING_PRODUCT_ALLOW_TO_SELL_BUNDLED_PRODUCT_ALONE),
			                   "SHOULD ALLOW BUNDLED PRODUCTS TO BE SOLD INDIVIDUALLY"
			)

	);

	// sale
	public static final List<SettingSale> SETTING_SALES = of(
			new SettingSale(SETTING_ENABLE_FLEXIBLE_SALE_PRICE, FALSE, TOGGLE, new String[] { },
			                strip(SETTING_ENABLE_FLEXIBLE_SALE_PRICE),
			                "ALLOW FLEXIBLE SALE PRICING FOR PRODUCTS WITH MULTIPLE PRICE TAGS"
			)
	);

	private static String[] options() {
		return new String[] { TRUE, FALSE };
	}

	private static String strip(String input) {
		String[] words = input.split("_");
		return String.join(" ", Arrays.copyOfRange(words, 1, words.length));
	}
}