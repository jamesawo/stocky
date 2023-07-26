import {Component, EventEmitter, Input, Output} from '@angular/core';
import {firstValueFrom, shareReplay} from 'rxjs';
import {SaleProductsUsecase} from '../../../sales/_usecase/sale-products.usecase';
import {ProductCategoryPayload} from '../../_data/product.payload';
import {ProductCategoryUsecase} from '../../_usecase/product-category.usecase';

@Component({
    selector: 'app-product-categories-tab',
    templateUrl: './product-categories-tab.component.html',
    styles: []
})
export class ProductCategoriesTabComponent {

    @Input()
    public class?: string;

    @Output()
    public selectChange = new EventEmitter<ProductCategoryPayload[]>();

    public categories: Array<ProductCategoryPayload> = [];

    public selection: Set<ProductCategoryPayload> = new Set<ProductCategoryPayload>();
    public selectAll = true;


    constructor(
        private usecase: ProductCategoryUsecase,
        private saleProductUsecase: SaleProductsUsecase
    ) {
    }

    async ngOnInit() {
        this.categories = await firstValueFrom(this.usecase.getMany().pipe(shareReplay()));
        this.onSelectAll(true);
    }

    public handleSelect(category: ProductCategoryPayload) {
        if (this.selection.has(category)) {
            this.selection.delete(category);
            this.notify();
        } else {
            this.selection.add(category);
            this.notify();
        }
    }

    public onSelectAll(select: boolean) {
        if (select) {
            this.notify([...this.categories]);
            //this.selection = new Set(this.categories);
        } else {
            this.notify([...this.selection]);
            //this.selection = new Set();
        }
        this.selectAll = select;
    }

    private notify(list?: ProductCategoryPayload[]) {
        const categories = [...list ?? this.selection];
        this.selectChange.emit(categories);
        this.saleProductUsecase.setCategories(categories);
    }

}
