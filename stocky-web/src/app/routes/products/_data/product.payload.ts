import {CommonPayload} from '../../../data/payload/common.payload';
import {ProductUnitOfMeasurePayload} from './product-unit-of-measure.payload';
import {ProductVariantEnum} from './product.enum';

export class ProductCategoryPayload {
    id?: number;
    title?: string;
    description?: string;
}

export class ProductVariant {
    id?: number;
    type?: ProductVariantEnum;
    value?: string;
}

export class ProductStatusPayload extends CommonPayload {
}

export class ProductTaxPayload extends CommonPayload {
    percent?: number = 0;
}

export class ProductPriceTab {
    markup: number = 0;
    taxes: ProductTaxPayload[] = [];
    costPrice: number = 0;
    sellingPrice: number = 0;
}

export class ProductBasicTab {
    productCategory?: ProductCategoryPayload;
    unitOfMeasure?: ProductUnitOfMeasurePayload;
    status?: ProductStatusPayload;
    isActive: boolean = true;
    useQuantity: boolean = true;
    isService: boolean = false;
    minAgeLimit: number = 13;
    productName?: string;
    brandName?: string;
    sku?: string;
    barcode?: string;
    description?: string;
}

export class ProductPayload {
    id?: number;
    basic: ProductBasicTab = new ProductBasicTab();
    price?: ProductPriceTab = new ProductPriceTab();
}

export class ProductSearchPayload {
    category?: ProductCategoryPayload;
    productName?: string;
    productBrand?: string;
    taxes: ProductTaxPayload[] = [];
    sku?: string;
    isService: boolean = false;
}
