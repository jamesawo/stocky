import {ProductBasicTab, ProductCategoryPayload, ProductPayload} from '../src/app/routes/products/_data/product.payload';

const mockProductCategory = new ProductCategoryPayload();
mockProductCategory.isActiveStatus = true;
mockProductCategory.title = 'TEST PRODUCT CATEGORY';
mockProductCategory.description = 'TEST PRODUCT CATEGORY TITLE';


const mockProductBasic = new ProductBasicTab();
mockProductBasic.brandName = 'TEST BRAND NAME';
mockProductBasic.productName = 'TEST PRODUCT NAME';
mockProductBasic.productCategory = mockProductCategory;


const mockProduct = new ProductPayload();
mockProduct.basic = mockProductBasic;
mockProduct.isActiveStatus = true;


export const MOCK_PRODUCT_CATEGORY = mockProductCategory;
export const MOCK_PRODUCT = mockProduct;
