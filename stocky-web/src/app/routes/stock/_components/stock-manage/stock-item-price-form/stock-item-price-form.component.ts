import {Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {NzInputNumberComponent} from 'ng-zorro-antd/input-number';
import {StockPrice} from '../../../_data/stock.payload';

type PriceInputType = 'cost' | 'markup';

@Component({
    selector: 'app-stock-item-price-form',
    templateUrl: './stock-item-price-form.component.html',
    styles: []
})
export class StockItemPriceFormComponent implements OnInit {
    @ViewChild('inputNumberComponent')
    public inputNumberComponent?: NzInputNumberComponent;

    @Input()
    public stockPrice: StockPrice = new StockPrice();

    @Output()
    public stockPriceChange = new EventEmitter<StockPrice>;

    @Input()
    public isGroupExpenses = false;

    @Input()
    public showLegend = true;
    
    constructor(private renderer: Renderer2) {
    }

    public reCalculateSellingPrice(type: PriceInputType): void {
        this.stockPrice.calculateSellingPrice!();
        this.onNotifyChange(type);
    }

    ngOnInit() {
        setTimeout(() => this.setFocusOnCostPrice(), 100);
    }


    private setFocusOnCostPrice() {
        if (this.inputNumberComponent?.inputElement?.nativeElement) {
            this.renderer.selectRootElement(this.inputNumberComponent.inputElement.nativeElement).focus();
        }
    }

    private onNotifyChange(type: PriceInputType) {
        if (type !== 'markup') {
            this.stockPriceChange.emit(this.stockPrice);
        }
    }

}
