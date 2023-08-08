import {Menu} from '@delon/theme';
import {MenuRoute} from './menu.payload';

export const MENU_BAG: Menu[] = [
    {
        text: 'Main',
        group: true,
        children: [

            {
                text: 'Dashboard',
                link: MenuRoute.DASHBOARD.Home,
                icon: {type: 'icon', value: 'appstore'},
                children: [
                    {text: 'Home', link: MenuRoute.DASHBOARD.Home}
                ]
            },

            {
                text: 'Products',
                icon: {type: 'icon', value: 'shopping-cart'},
                children: [
                    {
                        text: 'Categories',
                        link: MenuRoute.PRODUCT.Categories
                    },

                    {
                        text: 'Products',
                        link: MenuRoute.PRODUCT.Products
                    }
                ]
            },

            {
                text: 'Sales',
                icon: {type: 'icon', value: 'credit-card'},
                children: [
                    {text: 'Sale', link: MenuRoute.SALE.Sale},
                    {text: 'Order', link: MenuRoute.SALE.Order},
                    {text: 'Refund', link: MenuRoute.SALE.Refund},
                    {text: 'Shift Report', link: MenuRoute.SALE.Shift},
                    {text: 'RePrint Receipt', link: MenuRoute.SALE.RePrint}
                ]
            },

            {
                text: 'Stock',
                icon: {type: 'icon', value: 'appstore-add'},
                children: [
                    {text: 'Manage Stock', link: MenuRoute.STOCK.Manage_Stock},
                    {text: 'Count Stock', link: MenuRoute.STOCK.Count_Stock},
                    {text: 'View Low Stock', link: MenuRoute.STOCK.View_Low_Stock},
                    {text: 'Reconcile Stock', link: MenuRoute.STOCK.Reconcile_Stock},
                    {text: 'Record Stock Balance', link: MenuRoute.STOCK.Record_Stock_Balance},
                    {text: 'Record Damaged Stock', link: MenuRoute.STOCK.Record_Damaged_Stock},
                    {text: 'Move Stock Items', link: MenuRoute.STOCK.Move_Stock_Items}
                ]
            },

            {
                text: 'Company',
                icon: {type: 'icon', value: 'shop'},
                children: [
                    {text: 'Basic Setup', link: MenuRoute.COMPANY.Basic_Setup},
                    {text: 'Tax Setup', link: MenuRoute.COMPANY.Tax_Setup},
                    {text: 'Payment Options', link: MenuRoute.COMPANY.Payment_Options},
                    {
                        text: 'People Setup',
                        link: '/company/people',
                        children: [
                            {text: 'Customers', link: MenuRoute.PEOPLE.Customers},
                            {text: 'Employees', link: MenuRoute.PEOPLE.Employees},
                            {text: 'Suppliers', link: MenuRoute.PEOPLE.Suppliers}
                        ]
                    },
                    {text: 'Location Setup', link: MenuRoute.COMPANY.Location_Setup},
                    {text: 'Expenses Setup', link: MenuRoute.COMPANY.Expenses_Setup},
                    {text: 'Role Setup', link: MenuRoute.COMPANY.Role_Setup}

                ]
            },

            {
                text: 'Reports',
                icon: {type: 'icon', value: 'file-pdf'},
                children: [
                    {text: 'Sales', link: MenuRoute.REPORT.Sales},
                    {text: 'Expense', link: MenuRoute.REPORT.Expense},
                    {text: 'Employee', link: MenuRoute.REPORT.Employee},
                    {text: 'Customer', link: MenuRoute.REPORT.Customer},
                    {text: 'Stock', link: MenuRoute.REPORT.Stock}
                ]
            },

            {
                text: 'Settings',
                icon: {type: 'icon', value: 'setting'},
                children: [
                    {text: 'Dashboard', link: MenuRoute.SETTING.Dashboard},
                    {text: 'Expenses', link: MenuRoute.SETTING.Expenses},
                    {text: 'Sales', link: MenuRoute.SETTING.Sales},
                    {text: 'People', link: MenuRoute.SETTING.People},
                    {text: 'Stock', link: MenuRoute.SETTING.Stock},
                    {text: 'Product', link: MenuRoute.SETTING.Product}
                ]
            },

            {
                text: 'Subscription',
                icon: {type: 'icon', value: 'wallet'},
                children: [
                    {text: 'Plan', link: MenuRoute.SUBSCRIPTION.Plan},
                    {text: 'Payments', link: MenuRoute.SUBSCRIPTION.Payments},
                    {text: 'Settings', link: MenuRoute.SUBSCRIPTION.Settings},
                    {text: 'Billing', link: MenuRoute.SUBSCRIPTION.Billing},
                    {text: 'Notification', link: MenuRoute.SUBSCRIPTION.Notification}
                ]
            }

        ]
    }
];
