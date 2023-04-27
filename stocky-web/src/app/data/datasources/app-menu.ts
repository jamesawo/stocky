import { Menu } from '@app/core/types/menu';

export const Menus: Menu[] = [
    { position: 1, title: 'Dashboard', icon: 'grid', link: '/dashboard' },
    {
        position: 1,
        title: 'Sales',
        icon: 'trello',
        link: 'sales',
        children: [
            { position: 1, title: 'Sale', link: '/sales/sale' },
            { position: 2, title: 'Order', link: '/sales/order' },
            { position: 3, title: 'Refund', link: '/sales/refund' },
        ],
    },
    {
        position: 2,
        title: 'Products',
        icon: 'shopping-cart',
        link: 'products',
        children: [
            { position: 1, title: 'Categories', link: '/products/categories' },
            { position: 2, title: 'Products', link: '/products/manage' },
        ],
    },
    {
        position: 3,
        title: 'Stock',
        icon: 'shopping-bag',
        link: 'stock',
        children: [
            { position: 1, title: 'Manage', link: '/stock/manage' },
            { position: 2, title: 'Count Stock', link: '/stock/count' },
            {
                position: 3,
                title: 'Reorder Alert',
                link: 'stock/reorder-alert',
            },
            { position: 4, title: 'Reconciliation', link: '/stock/reconcile' },
        ],
    },
    {
        position: 4,
        title: 'Company',
        icon: 'home',
        link: 'company',
        children: [
            { position: 1, title: 'Basic', link: '/company/basic' },
            { position: 2, title: 'Tax', link: '/company/tax' },
            { position: 4, title: 'People', link: '/company/people' },
            { position: 5, title: 'Location', link: '/company/location' },
            { position: 6, title: 'Expenses', link: '/company/expenses' },
        ],
    },
    {
        position: 5,
        title: 'Report',
        icon: 'book-open',
        link: 'report',
        children: [
            { position: 1, title: 'Sales', link: '/report/sales' },
            { position: 2, title: 'Expense', link: '/report/expenses' },
            { position: 4, title: 'Employee', link: '/report/employees' },
            { position: 5, title: 'Customer', link: '/report/customers' },
            { position: 6, title: 'Stock', link: '/report/stock' },
        ],
    },
    {
        position: 6,
        title: 'Settings',
        icon: 'settings',
        link: 'settings',
        children: [
            { position: 1, title: 'Dashboard', link: '/settings/dashboard' },
            { position: 2, title: 'Expense', link: '/settings/expenses' },
            { position: 3, title: 'Sales', link: '/settings/sales' },
            { position: 4, title: 'People', link: '/settings/people' },
            { position: 5, title: 'Stock', link: '/settings/stock' },
            { position: 6, title: 'Product', link: '/settings/product' },
        ],
    },
];
