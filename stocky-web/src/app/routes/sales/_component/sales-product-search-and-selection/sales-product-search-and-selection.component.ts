import {Component} from '@angular/core';
import {DisplayType} from '../sales-product-selection/sales-product-selection.component';

@Component({
    selector: 'app-sales-product-search-and-selection',
    templateUrl: './sales-product-search-and-selection.component.html',
    styles: []
})
export class SalesProductSearchAndSelectionComponent {

    public readonly display = DisplayType;
    public listView = false;
    public lowStockVisibility = true;

    public toggleView = () => {this.listView = !this.listView;};

    public toggleLowStockVisibility = () => {
        this.lowStockVisibility = !this.lowStockVisibility;
    };
}
