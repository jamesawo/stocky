import {Crumbs} from '../../shared/components/breadcrumbs/breadcrumbs.component';

export const PRODUCT_CATEGORY_LIST_CRUMBS: Crumbs[] = [
    {link: '/dashboard', title: 'Dashboard'},
    {link: '/products/product-list', title: 'Product'},
    {link: '/products/category-list', title: 'Categories'}
];

export const PRODUCT_ADD_CRUMBS: Crumbs[] = [
    {link: '/dashboard', title: 'Dashboard'},
    {link: '/products/product-list', title: 'Product'},
    {link: '/products/product-add', title: 'Add Product '}
];

export const PRODUCT_LIST_CRUMBS: Crumbs[] = [
    {link: '/dashboard', title: 'Dashboard'},
    {link: '/products/product-list', title: 'Product'},
    {link: '/products/product-list', title: 'All Products '}
];

export const STOCK_MANAGE_CRUMBS: Crumbs[] = [
    {link: '/stock', title: 'Stock'},
    {link: '/stock/stock-manage', title: 'Manage Stock'}
];

export const STOCK_VIEW_COUNT: Crumbs[] = [
    {link: '/stock', title: 'Stock'},
    {link: '/stock/view-stock-count', title: 'View Stock Count'}
];

export const STOCK_VIEW_LOW_PRODUCT: Crumbs[] = [
    {link: '/stock', title: 'Stock'},
    {link: '/stock/view-low-stock', title: 'View Low Stock'}
];

export const STOCK_RECONCILE: Crumbs[] = [
    {link: '/stock', title: 'Stock'},
    {link: '/stock/reconcile-stock', title: 'Reconcile Stock'}
];

export const TAX_SETUP: Crumbs[] = [
    {link: '/dashboard', title: 'Company'},
    {link: '/company/tax-setup', title: 'Tax Setup'}
];


export const EXPENSES_SETUP: Crumbs[] = [
    {link: '/dashboard', title: 'Company'},
    {link: '/company/expenses-setup', title: 'Manage Expenses'}
];
