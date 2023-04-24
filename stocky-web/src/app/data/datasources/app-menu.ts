import { Menu } from '@app/core/types/menu';

export const Menus: Menu[] = [
    { position: 1, title: 'Dashboard', icon: 'grid', link: '' },
    { position: 1, title: 'Sales', icon: 'trello', link: '' },
    { position: 2, title: 'Products', icon: 'shopping-cart', link: '' },
    { position: 3, title: 'Stock', icon: 'shopping-bag', link: '' },
    { position: 4, title: 'Company', icon: 'home', link: '' },
    { position: 5, title: 'Report', icon: 'book-open', link: '' },
    {
        position: 6,
        title: 'Settings',
        icon: 'settings',
        link: '',
        children: [
            { position: 1, title: 'Dashboard', link: '' },
            { position: 2, title: 'People', link: '' },
            {
                position: 3,
                title: 'Tax',
                link: '',
                children: [{ position: 1, title: 'Vat', link: '' }],
            },
        ],
    },
];
