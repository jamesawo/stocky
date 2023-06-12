import {Menu} from '@delon/theme';

export const MENU_BAG: Menu[] = [
    {
        text: 'Main',
        group: true,
        children: [
            {
                text: 'Dashboard',
                link: '/dashboard',
                icon: {type: 'icon', value: 'appstore'}
            },

            {
                text: 'Products',
                icon: {type: 'icon', value: 'shopping-cart'},
                children: [
                    {
                        text: 'Categories',
                        link: '/products/category-list'
                    },

                    {
                        text: 'Products',
                        link: '/products/product-list'
                    }
                ]
            },

            {
                text: 'Sales',
                icon: {type: 'icon', value: 'credit-card'},
                children: [
                    {text: 'Sale', link: '/sales/sale-pos'},
                    {text: 'Order', link: '/sales/order'},
                    {text: 'Refund', link: '/sales/refund'}
                ]
            },

            {
                text: 'Stock',
                icon: {type: 'icon', value: 'appstore-add'},
                children: [
                    {text: 'Manage Stock', link: '/stock/manage-stock'},
                    {text: 'Count Stock', link: '/stock/view-stock-count'},
                    {text: 'View Low Stock', link: 'stock/view-low-stock'},
                    {text: 'Reconcile Stock', link: '/stock/reconcile-stock'},
                    {text: 'Record Stock Balance', link: '/stock/record-stock-balance'},
                    {text: 'Record Damaged Stock', link: '/stock/record-damaged-stock'},
                    {text: 'Move Stock Items', link: '/stock/move-stock-items'}
                ]
            },

            {
                text: 'Company',
                icon: {type: 'icon', value: 'shop'},
                children: [
                    {text: 'Basic Setup', link: '/company/basic-setup'},
                    {text: 'Tax Setup', link: '/company/tax-setup'},
                    {text: 'Payment Options', link: '/company/payment-options'},
                    {
                        text: 'People Setup',
                        link: '/company/people',
                        children: [
                            {text: 'Customers', link: '/company/people/customers'},
                            {text: 'Employees', link: '/company/people/employees'},
                            {text: 'Suppliers', link: '/company/people/suppliers'}
                        ]
                    },
                    {text: 'Location Setup', link: '/company/location-setup'},
                    {text: 'Expenses Setup', link: '/company/expenses-setup'},
                    {text: 'Role Setup', link: '/company/role-setup'}

                ]
            },

            {
                text: 'Reports',
                icon: {type: 'icon', value: 'file-pdf'},
                children: [
                    {text: 'Sales', link: '/reports/sales-report'},
                    {text: 'Expense', link: '/reports/expenses-report'},
                    {text: 'Employee', link: '/reports/employees-report'},
                    {text: 'Customer', link: '/reports/customers-report'},
                    {text: 'Stock', link: '/reports/stock-report'}
                ]
            },

            {
                text: 'Settings',
                icon: {type: 'icon', value: 'setting'},
                children: [
                    {text: 'Dashboard', link: '/settings/dashboard'},
                    {text: 'Expenses', link: '/settings/expenses'},
                    {text: 'Sales', link: '/settings/sales'},
                    {text: 'People', link: '/settings/people'},
                    {text: 'Stock', link: '/settings/stock'},
                    {text: 'Product', link: '/settings/product'}
                ]
            },

            {
                text: 'Subscription',
                icon: {type: 'icon', value: 'wallet'},
                children: [
                    {text: 'Plan', link: '/paywall/plan'},
                    {text: 'Payments', link: '/paywall/payments'},
                    {text: 'Settings', link: '/paywall/settings'},
                    {text: 'Billing', link: '/paywall/billing'},
                    {text: 'Notification', link: '/paywall/notification'}
                ]
            }
        ]
    }
];
