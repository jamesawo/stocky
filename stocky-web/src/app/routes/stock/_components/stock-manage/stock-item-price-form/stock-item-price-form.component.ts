import {Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {NzInputNumberComponent} from 'ng-zorro-antd/input-number';
import {calculateSellingPrice} from '../../../../../shared/utils/util';
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
    public expensesAmount: number = 0;

    constructor(private renderer: Renderer2) {
    }

    public calculate(type: PriceInputType): void {
        let costPrice = this.stockPrice.costPrice;
        let markUpPercent = this.stockPrice.markupPercent;

        const expensesCostPrice = Number(costPrice) + Number(this.expensesAmount);
        this.stockPrice.sellingPrice = calculateSellingPrice(expensesCostPrice, markUpPercent);
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
