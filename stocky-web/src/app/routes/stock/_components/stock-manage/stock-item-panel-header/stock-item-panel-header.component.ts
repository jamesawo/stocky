import {Component, Input} from '@angular/core';
import {StockItemPanel} from '../../../_data/stock.payload';

@Component({
    selector: 'app-stock-item-panel-header',
    templateUrl: './stock-item-panel-header.component.html',
    styles: []
})
export class StockItemPanelHeaderComponent {

    @Input()
    public item: StockItemPanel = new StockItemPanel();

}
