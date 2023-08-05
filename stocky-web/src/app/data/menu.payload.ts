enum DashboardRoute {
    Home = '/dashboard'
}

enum ProductRoute {
    'Categories' = '/products/category-list',
    'Products' = '/products/product-list',
}

enum SaleRoute {
    Sale = '/sales/sale-pos',
    Order = '/sales/order',
    Refund = '/sales/refund',
    Shift = '/sales/sale-shift',
    RePrint = '/sales/reprint-receipt',
}

enum StockRoute {
    Manage_Stock = '/stock/manage-stock',
    Count_Stock = '/stock/view-stock-count',
    View_Low_Stock = 'stock/view-low-stock',
    Reconcile_Stock = '/stock/reconcile-stock',
    Record_Stock_Balance = '/stock/record-stock-balance',
    Record_Damaged_Stock = '/stock/record-damaged-stock',
    Move_Stock_Items = '/stock/move-stock-items'
}

enum CompanyPeopleRoute {
    Customers = '/company/people/customers',
    Employees = '/company/people/employees',
    Suppliers = '/company/people/suppliers'
}

enum CompanyRoute {
    Basic_Setup = '/company/basic-setup',
    Tax_Setup = '/company/tax-setup',
    Payment_Options = '/company/payment-options',
    Location_Setup = '/company/location-setup',
    Expenses_Setup = '/company/expenses-setup',
    Role_Setup = '/company/role-setup'
}

enum ReportRoute {
    Sales = '/reports/sales-report',
    Expense = '/reports/expenses-report',
    Employee = '/reports/employees-report',
    Customer = '/reports/customers-report',
    Stock = '/reports/stock-report'
}

enum SettingRoute {
    Dashboard = '/settings/dashboard',
    Expenses = '/settings/expenses',
    Sales = '/settings/sales',
    People = '/settings/people',
    Stock = '/settings/stock',
    Product = '/settings/product',
}

enum SubscriptionRoute {
    Plan = '/paywall/plan',
    Payments = '/paywall/payments',
    Settings = '/paywall/settings',
    Billing = '/paywall/billing',
    Notification = '/paywall/notification'
}

export class MenuRoute {
    static DASHBOARD = DashboardRoute;
    static SALE = SaleRoute;
    static PRODUCT = ProductRoute;
    static STOCK = StockRoute;
    static COMPANY = CompanyRoute;
    static COMPANY_PEOPLE = CompanyPeopleRoute;
    static REPORT = ReportRoute;
    static SETTING = SettingRoute;
    static SUBSCRIPTION = SubscriptionRoute;
}
