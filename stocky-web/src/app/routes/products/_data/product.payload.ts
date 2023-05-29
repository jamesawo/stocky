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

export class ProductStatusPayload extends CommonPayload {}

export class ProductTaxPayload extends CommonPayload {
    percent?: number = 0;
}

export class ProductPriceTab {
    markup: number = 0;
    taxes: ProductTaxPayload[] = [];
    costPrice: number = 0;
    sellingPrice: number = 0;
}

export class ProductPayload {
    id?: number;
    productCategory?: ProductCategoryPayload;
    unitOfMeasure?: ProductUnitOfMeasurePayload;
    status?: ProductStatusPayload;
    isActive?: boolean;
    useQuantity?: boolean;
    isService?: boolean;
    minAgeLimit: number = 13;
    productName?: string;
    brandName?: string;
    sku?: string;
    barcode?: string;
    description?: string;
    price?: ProductPriceTab;
}
