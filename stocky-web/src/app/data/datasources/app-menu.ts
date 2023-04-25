import { Menu } from '@app/core/types/menu';

export const Menus: Menu[] = [
    { position: 1, title: 'Dashboard', icon: 'grid', link: '' },
    {
        position: 1,
        title: 'Sales',
        icon: 'trello',
        link: '',
        children: [
            { position: 1, title: 'Sale', link: '' },
            { position: 2, title: 'Order', link: '' },
            { position: 3, title: 'Refund', link: '' },
        ],
    },
    {
        position: 2,
        title: 'Products',
        icon: 'shopping-cart',
        link: '',
        children: [
            { position: 1, title: 'Categories', link: '' },
            { position: 2, title: 'Products', link: '' },
        ],
    },
    {
        position: 3,
        title: 'Stock',
        icon: 'shopping-bag',
        link: '',
        children: [
            { position: 1, title: 'Manage', link: '' },
            { position: 2, title: 'Count Stock', link: '' },
            { position: 3, title: 'Reorder Alert', link: '' },
            { position: 4, title: 'Reconciliation', link: '' },
        ],
    },
    {
        position: 4,
        title: 'Company',
        icon: 'home',
        link: '',
        children: [
            { position: 1, title: 'Basic', link: '' },
            { position: 2, title: 'Tax', link: '' },
            { position: 4, title: 'People', link: '' },
            { position: 5, title: 'Location', link: '' },
            { position: 6, title: 'Expenses', link: '' },
        ],
    },
    {
        position: 5,
        title: 'Report',
        icon: 'book-open',
        link: '',
        children: [
            { position: 1, title: 'Sales', link: '' },
            { position: 2, title: 'Expense', link: '' },
            { position: 4, title: 'Employee', link: '' },
            { position: 5, title: 'Customer', link: '' },
            { position: 6, title: 'Stock', link: '' },
        ],
    },
    {
        position: 6,
        title: 'Settings',
        icon: 'settings',
        link: '',
        children: [
            { position: 1, title: 'Dashboard', link: '' },
            { position: 2, title: 'Expense', link: '' },
            { position: 3, title: 'Sales', link: '' },
            { position: 4, title: 'People', link: '' },
            { position: 5, title: 'Stock', link: '' },
            { position: 6, title: 'Product', link: '' },
        ],
    },
];
