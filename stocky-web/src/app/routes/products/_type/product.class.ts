import { VariantEnum } from './product.enum';

export class ProductCategory {
    id?: number;
    title!: string;
    description?: string;
    parent?: ProductCategory;
}

export class ProductVariant {
    id?: number;
    type?: VariantEnum;
    value?: string;
}

export class ProductPayload {
    id?: number;
    title!: string;
    sku?: string;
    category?: ProductCategory;
    variants?: ProductVariant[];
    unitCost?: number;
    sellingPrice?: number;
    description?: string;
    status?: boolean;
}
