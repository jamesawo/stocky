package com.jamesaworo.stocky.features.authentication.domain.enums;


import java.util.List;

import static com.jamesaworo.stocky.core.constants.ModulePermissions.*;

public enum AppModuleEnum {
    AUTHENTICATION {
        public List<AppModuleRoute> pageRoute() {
            return List.of(new AppModuleRoute("Account", AUTHENTICATION_ACCESS_PAGE_MANAGE_ACCOUNT, "/authentication/account"));
        }

        public String pageIcon() {
            return "appstore";
        }
    },
    COMPANY {
        public List<AppModuleRoute> pageRoute() {
            return List.of(
                    new AppModuleRoute("Basic", COMPANY_BASIC_ACCESS_PAGE_COMPANY_BASIC, "/company/basic-setup"),
                    new AppModuleRoute("Tax", COMPANY_TAX_ACCESS_PAGE_TAX_SETUP, "/company/tax-setup"),
                    new AppModuleRoute("Payment Options", COMPANY_PAYMENT_OPTION_ACCESS_PAGE_PAYMENT_OPTION, "/company/payment-options"),
                    new AppModuleRoute("Measurement Setup", COMPANY_UNIT_OF_MEASURE_ACCESS_PAGE, "/company/unit-of-measure-setup"),
                    new AppModuleRoute("Status Setup", COMPANY_PRODUCT_STATUS_ACCESS_PAGE, "/company/status-setup"),
                    new AppModuleRoute("Location", COMPANY_LOCATION_ACCESS_PAGE_LOCATION, "/company/location-setup"),
                    new AppModuleRoute("Expenses", COMPANY_EXPENSES_ACCESS_PAGE_EXPENSES, "/company/expenses-setup"),
                    new AppModuleRoute("Roles", COMPANY_ROLE_ACCESS_PAGE_ROLE, "/company/role-setup")
            );
        }

        public String pageIcon() {
            return "shop";
        }
    },
    PEOPLE {
        public List<AppModuleRoute> pageRoute() {
            return List.of(
                    new AppModuleRoute("Customers", COMPANY_CUSTOMER_ACCESS_PAGE_CUSTOMER, "/company/people/customers"),
                    new AppModuleRoute("Employees", COMPANY_EMPLOYEE_ACCESS_PAGE_EMPLOYEE, "/company/people/employees"),
                    new AppModuleRoute("Suppliers", COMPANY_SUPPLIER_ACCESS_PAGE_SUPPLIER, "/company/people/suppliers")
            );
        }

        public String pageIcon() {
            return "team";
        }
    },
    PRODUCT {
        public List<AppModuleRoute> pageRoute() {
            return List.of(
                    new AppModuleRoute("Categories", PRODUCT_CATEGORY_ACCESS_PAGE_PRODUCT_CATEGORY, "/products/category-list"),
                    new AppModuleRoute("Products", PRODUCT_ACCESS_PAGE_PRODUCT, "/products/product-list")
            );
        }

        public String pageIcon() {
            return "shopping-cart";
        }
    },
    STOCK {
        public List<AppModuleRoute> pageRoute() {

            return List.of(
                    new AppModuleRoute("Manage Stock", STOCK_ACCESS_PAGE_STOCK_MANAGE, "/stock/manage-stock"),
                    new AppModuleRoute("Count Stock", STOCK_COUNT_ACCESS_PAGE_COUNT_STOCK, "/stock/view-stock-count"),
                    new AppModuleRoute("Low Stock Balance", STOCK_LOW_STOCK_ACCESS_PAGE_LOW_STOCK, "/stock/view-low-stock"),
                    new AppModuleRoute("Reconcile Stock", STOCK_RECONCILE_ACCESS_PAGE_RECONCILE_STOCK, "/stock/reconcile-stock"),
                    new AppModuleRoute("Record Stock Balance", STOCK_RECORD_STOCK_BALANCE_ACCESS_PAGE_RECORD_STOCK_BALANCE, "/stock/record-stock-balance"),
                    new AppModuleRoute("Record Damaged Stock", STOCK_RECORD_DAMAGED_GOODS_ACCESS_PAGE_RECORD_DAMAGED_GOODS, "/stock/record-damaged-stock"),
                    new AppModuleRoute("Move Stock Items", STOCK_MOVE_ITEM_ACCESS_PAGE_MOVE_STOCK_ITEM, "/stock/move-stock-items")
            );
        }

        public String pageIcon() {
            return "appstore-add";
        }
    },
    REPORT {
        public List<AppModuleRoute> pageRoute() {
            return List.of(
                    new AppModuleRoute("Sales", REPORT_ACCESS_PAGE_REPORT_SALES, "/reports/sales-report"),
                    new AppModuleRoute("Expense", REPORT_ACCESS_PAGE_REPORT_EXPENSES, "/reports/expenses-report"),
                    new AppModuleRoute("Employee", REPORT_ACCESS_PAGE_REPORT_EMPLOYEE, "/reports/employees-report"),
                    new AppModuleRoute("Customer", REPORT_ACCESS_PAGE_REPORT_CUSTOMER, "/reports/customers-report"),
                    new AppModuleRoute("Stock", REPORT_ACCESS_PAGE_REPORT_STOCK, "/reports/stock-report")
            );
        }

        public String pageIcon() {
            return "file-pdf";
        }
    },
    SETTING {
        public List<AppModuleRoute> pageRoute() {
            return List.of(
                    new AppModuleRoute("Dashboard", SETTING_ACCESS_PAGE_SETTING_DASHBOARD, "/settings/dashboard"),
                    new AppModuleRoute("Expenses", SETTING_ACCESS_PAGE_SETTING_EXPENSES, "/settings/expenses"),
                    new AppModuleRoute("Sales", SETTING_ACCESS_PAGE_SETTING_SALES, "/settings/sales"),
                    new AppModuleRoute("People", SETTING_ACCESS_PAGE_SETTING_PEOPLE, "/settings/people"),
                    new AppModuleRoute("Stock", SETTING_ACCESS_PAGE_SETTING_STOCK, "/settings/stock"),
                    new AppModuleRoute("Product", SETTING_ACCESS_PAGE_SETTING_PRODUCT, "/settings/product")
            );
        }

        public String pageIcon() {
            return "setting";
        }
    },
    SALE {
        public List<AppModuleRoute> pageRoute() {
            return List.of(
                    new AppModuleRoute("Sale", SALE_ACCESS_PAGE_SALE_STORE_FRONT, "/sales/sale-pos"),
                    new AppModuleRoute("Refund", SALE_ACCESS_PAGE_SALE_REFUND, "/sales/refund"),
                    new AppModuleRoute("Shift", SALE_ACCESS_PAGE_SALE_SHIFT_PER_DAY, "/sales/sale-shift"),
                    new AppModuleRoute("RePrint", SALE_ACCESS_PAGE_SALE_REPRINT_RECEIPT, "/sales/reprint-receipt")
            );
        }

        public String pageIcon() {
            return "credit-card";
        }
    },
    SUBSCRIPTION {
        public List<AppModuleRoute> pageRoute() {
            return List.of(
                    new AppModuleRoute("Plan", PAYWALL_ACCESS_PAGE_PAYWALL_PLAN, "/paywall/plan"),
                    new AppModuleRoute("Payments", PAYWALL_ACCESS_PAGE_PAYWALL_PAYMENTS, "/paywall/payments"),
                    new AppModuleRoute("Settings", PAYWALL_ACCESS_PAGE_PAYWALL_SETTINGS, "/paywall/settings"),
                    new AppModuleRoute("Billing", PAYWALL_ACCESS_PAGE_PAYWALL_BILLING, "/paywall/billing"),
                    new AppModuleRoute("Notification", PAYWALL_ACCESS_PAGE_PAYWALL_NOTIFICATION, "/paywall/notification")
            );
        }

        public String pageIcon() {
            return "wallet";
        }
    };

    public abstract List<AppModuleRoute> pageRoute();

    public abstract String pageIcon();

}
