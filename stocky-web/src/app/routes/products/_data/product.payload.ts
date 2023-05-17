import {ProductCategoryPayload} from './product-category.payload';
import {ProductVariantEnum} from './product.enum';


export class ProductVariant {
    id?: number;
    type?: ProductVariantEnum;
    value?: string;
}

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
