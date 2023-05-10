import { Menu } from '@delon/theme';

export const MENU_BAG: Menu[] = [
    {
        text: 'Main',
        group: true,
        children: [
            {
                text: 'Dashboard',
                link: '/dashboard',
                icon: { type: 'icon', value: 'appstore' },
            },

            {
                text: 'Products',
                icon: { type: 'icon', value: 'shopping-cart' },
                children: [
                    {
                        text: 'Categories',
                        link: '/products/category-list',
                    },
                    {
                        text: 'Variants',
                        link: '/products/variants',
                    },
                    {
                        text: 'Products',
                        link: '/products/product-list',
                    },
                ],
            },

            {
                text: 'Sales',
                icon: { type: 'icon', value: 'credit-card' },
                children: [
                    { text: 'Sale', link: '/sales/sale' },
                    { text: 'Order', link: '/sales/order' },
                    { text: 'Refund', link: '/sales/refund' },
                ],
            },
            {
                text: 'Stock',
                icon: { type: 'icon', value: 'appstore-add' },
                children: [
                    { text: 'Manage', link: '/stock/manage' },
                    { text: 'Count Stock', link: '/stock/count' },
                    { text: 'Reorder Alert', link: 'stock/reorder-alert' },
                    { text: 'Reconciliation', link: '/stock/reconcile' },
                ],
            },
            {
                text: 'Company',
                icon: { type: 'icon', value: 'shop' },
                children: [
                    { text: 'Basic', link: '/company/basic' },
                    { text: 'Tax', link: '/company/tax' },
                    { text: 'People', link: '/company/people' },
                    { text: 'Location', link: '/company/location' },
                    { text: 'Expenses', link: '/company/expenses' },
                ],
            },
            {
                text: 'Report',
                icon: { type: 'icon', value: 'file-pdf' },
                children: [
                    { text: 'Sales', link: '/report/sales' },
                    { text: 'Expense', link: '/report/expenses' },
                    { text: 'Employee', link: '/report/employees' },
                    { text: 'Customer', link: '/report/customers' },
                    { text: 'Stock', link: '/report/stock' },
                ],
            },

            {
                text: 'Settings',
                icon: { type: 'icon', value: 'setting' },
                children: [
                    { text: 'Dashboard', link: '/settings/dashboard' },
                    { text: 'Expense', link: '/settings/expenses' },
                    { text: 'Sales', link: '/settings/sales' },
                    { text: 'People', link: '/settings/people' },
                    { text: 'Stock', link: '/settings/stock' },
                    { text: 'Product', link: '/settings/product' },
                ],
            },
        ],
    },
];
