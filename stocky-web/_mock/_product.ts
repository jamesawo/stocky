import {ProductCategoryPayload, ProductPayload} from '../src/app/routes/products/_data/product.payload';

export const MOCK_PRODUCT_CATEGORIES: Array<ProductCategoryPayload> = [
    {
        'id': 1,
        'title': 'Electronics',
        'description': 'Electronic devices and gadgets',
        'isActiveStatus': true
    },
    {
        'id': 2,
        'title': 'Clothing',
        'description': 'Fashion and apparel',
        'isActiveStatus': true
    }
] as ProductCategoryPayload[];

export const MOCK_PRODUCTS: Array<ProductPayload> = [
    {
        'id': 1,
        'basic': {
            'productCategory': {
                'id': 101,
                'title': 'Electronics',
                'description': 'Electronic devices and gadgets',
                'isActiveStatus': true
            },
            'unitOfMeasure': {
                'id': 201,
                'title': 'Each',
                'unit': 'ea'
            },
            'status': {
                'id': 301,
                'title': 'Available',
                'description': 'Product is in stock',
                'isActiveStatus': true
            },
            'isActive': true,
            'useQuantity': true,
            'isService': false,
            'minAgeLimit': 13,
            'productName': 'Smartphone',
            'brandName': 'TechX',
            'sku': 'TX12345',
            'barcode': '123456789012',
            'description': 'A high-end smartphone with advanced features',
            'lowStockPoint': 20,
            'quantity': 100,
            'taxes': [
                {
                    'id': 401,
                    'title': 'Sales Tax',
                    'description': 'Standard sales tax',
                    'isActiveStatus': true,
                    'percent': 10
                },
                {
                    'id': 402,
                    'title': 'Import Tax',
                    'description': 'Tax on imported products',
                    'isActiveStatus': true,
                    'percent': 5
                }
            ]
        },
        'price': {
            'markup': 20,
            'costPrice': 500,
            'sellingPrice': 600,
            'discount': 10
        },
        'createdAt': '2023-07-20',
        'isActiveStatus': true
    },
    {
        'id': 2,
        'basic': {
            'productCategory': {
                'id': 102,
                'title': 'Clothing',
                'description': 'Fashion and apparel',
                'isActiveStatus': true
            },
            'unitOfMeasure': {
                'id': 202,
                'title': 'Piece',
                'unit': 'pc'
            },
            'status': {
                'id': 302,
                'title': 'Out of Stock',
                'description': 'Product is currently unavailable',
                'isActiveStatus': false
            },
            'isActive': false,
            'useQuantity': false,
            'isService': false,
            'minAgeLimit': 18,
            'productName': 'T-Shirt',
            'brandName': 'FashionHub',
            'sku': 'FH98765',
            'barcode': '987654321098',
            'description': 'A comfortable cotton t-shirt for casual wear',
            'lowStockPoint': 30,
            'quantity': 0,
            'taxes': [
                {
                    'id': 403,
                    'title': 'VAT',
                    'description': 'Value Added Tax',
                    'isActiveStatus': true,
                    'percent': 15
                }
            ]
        },
        'price': {
            'markup': 15,
            'costPrice': 25,
            'sellingPrice': 30,
            'discount': 0
        },
        'createdAt': '2023-07-20',
        'isActiveStatus': false
    },
    {
        'id': 3,
        'basic': {
            'productCategory': {
                'id': 103,
                'title': 'Books',
                'description': 'Fiction and non-fiction books',
                'isActiveStatus': true
            },
            'unitOfMeasure': {
                'id': 203,
                'title': 'Book',
                'unit': 'bk'
            },
            'status': {
                'id': 303,
                'title': 'Available',
                'description': 'Product is in stock',
                'isActiveStatus': true
            },
            'isActive': true,
            'useQuantity': true,
            'isService': false,
            'minAgeLimit': 0,
            'productName': 'The Great Gatsby',
            'brandName': 'ClassicBooks',
            'sku': 'CB001',
            'barcode': '543216789012',
            'description': 'A timeless classic novel by F. Scott Fitzgerald',
            'lowStockPoint': 10,
            'quantity': 50,
            'taxes': [
                {
                    'id': 404,
                    'title': 'GST',
                    'description': 'Goods and Services Tax',
                    'isActiveStatus': true,
                    'percent': 5
                }
            ]
        },
        'price': {
            'markup': 10,
            'costPrice': 12,
            'sellingPrice': 15,
            'discount': 0
        },
        'createdAt': '2023-07-20',
        'isActiveStatus': true
    },
    {
        'id': 4,
        'basic': {
            'productCategory': {
                'id': 103,
                'title': 'Books',
                'description': 'Fiction and non-fiction books',
                'isActiveStatus': true
            },
            'unitOfMeasure': {
                'id': 203,
                'title': 'Book',
                'unit': 'bk'
            },
            'status': {
                'id': 303,
                'title': 'Available',
                'description': 'Product is in stock',
                'isActiveStatus': true
            },
            'isActive': true,
            'useQuantity': true,
            'isService': false,
            'minAgeLimit': 0,
            'productName': 'The Uniform Gatsby',
            'brandName': 'ClassicBooks',
            'sku': 'CB001',
            'barcode': '543216789012',
            'description': 'A timeless classic novel by F. Scott Fitzgerald',
            'lowStockPoint': 10,
            'quantity': 50,
            'taxes': [
                {
                    'id': 404,
                    'title': 'GST',
                    'description': 'Goods and Services Tax',
                    'isActiveStatus': true,
                    'percent': 5
                }
            ]
        },
        'price': {
            'markup': 10,
            'costPrice': 12,
            'sellingPrice': 15,
            'discount': 0
        },
        'createdAt': '2023-07-20',
        'isActiveStatus': true
    },
    {
        'id': 5,
        'basic': {
            'productCategory': {
                'id': 103,
                'title': 'Books',
                'description': 'Fiction and non-fiction books',
                'isActiveStatus': true
            },
            'unitOfMeasure': {
                'id': 203,
                'title': 'Book',
                'unit': 'bk'
            },
            'status': {
                'id': 303,
                'title': 'Available',
                'description': 'Product is in stock',
                'isActiveStatus': true
            },
            'isActive': true,
            'useQuantity': true,
            'isService': false,
            'minAgeLimit': 0,
            'productName': 'The Road of Untold Gatsby',
            'brandName': 'ClassicBooks',
            'sku': 'CB0010',
            'barcode': '5432167890121',
            'description': 'A timeless classic novel by F. Scott Fitzgerald',
            'lowStockPoint': 10,
            'quantity': 50,
            'taxes': [
                {
                    'id': 404,
                    'title': 'GST',
                    'description': 'Goods and Services Tax',
                    'isActiveStatus': true,
                    'percent': 5
                }
            ]
        },
        'price': {
            'markup': 10,
            'costPrice': 12,
            'sellingPrice': 15,
            'discount': 0
        },
        'createdAt': '2023-07-20',
        'isActiveStatus': true
    }
] as ProductPayload[];
