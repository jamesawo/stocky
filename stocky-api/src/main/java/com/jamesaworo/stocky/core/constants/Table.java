package com.jamesaworo.stocky.core.constants;

/**
 * @author Aworo James
 * @since 4/16/23
 */
public class Table {
    public static final String PREFIX = "STOCKY_";

    // SETTING TABLES
    public static final String SETTING = PREFIX + "SETTING";
    public static final String SETTING_DASHBOARD = SETTING + "_DASHBOARD";
    public static final String SETTING_BACKUP_RESTORE = SETTING + "_BACKUP";
    public static final String SETTING_EXPENSES = SETTING + "_EXPENSES";
    public static final String SETTING_NOTIFICATION = SETTING + "_NOTIFICATION";
    public static final String SETTING_PAYMENT_METHOD = SETTING + "_PAYMENT_METHOD";
    public static final String SETTING_TAX = SETTING + "_TAX";
    public static final String SETTING_OPTIONS = SETTING + "_OPTION";

    // PRODUCT TABLES
    public static final String PRODUCT = PREFIX + "PRODUCT";
    public static final String PRODUCT_CATEGORY = PRODUCT + "_CATEGORIES";
    public static final String PRODUCT_VARIATIONS = PRODUCT + "_VARIATIONS";

}