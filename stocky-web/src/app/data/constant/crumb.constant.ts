import {Crumbs} from '../../shared/components/breadcrumbs/breadcrumbs.component';

export class CrumbsConstant {
    static productCategoryCrumbs: Crumbs[] = [
        {link: '/dashboard', title: 'Dashboard'},
        {link: '/products/product-list', title: 'Product'},
        {link: '/products/category-list', title: 'Categories'},
    ];
}
