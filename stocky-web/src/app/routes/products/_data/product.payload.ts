import {CommonPayload} from '../../../data/payload/common.payload';
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

export class ProductPayload {
    id?: number;
    title!: string;
    sku?: string;
    category?: ProductCategoryPayload;
    variants?: ProductVariant[];
    unitCost?: number;
    sellingPrice?: number;
    description?: string;
    status?: boolean;
}
