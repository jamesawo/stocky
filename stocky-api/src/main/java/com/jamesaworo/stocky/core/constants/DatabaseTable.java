package com.jamesaworo.stocky.core.constants;

/**
 * @author Aworo James
 * @since 4/16/23
 */
public class DatabaseTable {
    public static final String PREFIX = "STOCKY_";

    // SETTING TABLES
    public static final String SETTING = PREFIX + "SETTING";
    public static final String SETTING_DASHBOARD = PREFIX + SETTING + "_DASHBOARD";
    public static final String SETTING_BACKUP_RESTORE = PREFIX + SETTING + "_BACKUP";
    public static final String SETTING_EXPENSES = PREFIX + SETTING + "_EXPENSES";
    public static final String SETTING_NOTIFICATION = PREFIX + SETTING + "_NOTIFICATION";
    public static final String SETTING_PAYMENT_METHOD = PREFIX + SETTING + "_PAYMENT_METHOD";
    public static final String SETTING_TAX = PREFIX + SETTING + "_TAX";
}