import {Component, Input} from '@angular/core';
import {StockItem} from '../../../_data/stock.payload';

@Component({
    selector: 'app-stock-item-panel-header',
    templateUrl: './stock-item-panel-header.component.html',
    styles: []
})
export class StockItemPanelHeaderComponent {

    @Input()
    public item: StockItem = new StockItem();

}
