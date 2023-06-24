import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NzInputNumberComponent} from 'ng-zorro-antd/input-number';
import {StockSettlement} from '../../../_data/stock.payload';

@Component({
    selector: 'app-stock-item-settlement-form',
    templateUrl: './stock-item-settlement-form.component.html',
    styles: []
})
export class StockItemSettlementFormComponent {

    public isPaidInvalid = false;

    @ViewChild('totalAmountNzInputNumberComponent')
    public totalAmount?: NzInputNumberComponent;

    @ViewChild('amountPaidNzInputNumberComponent')
    public amountPaid?: NzInputNumberComponent;

    @ViewChild('balanceAmountNzInputNumberComponent')
    public balanceAmount?: NzInputNumberComponent;

    @Input()
    public settlement: StockSettlement = new StockSettlement();

    @Output()
    public settlementChange = new EventEmitter<StockSettlement>;

    constructor() {}

    public calculate() {
        this.resetValidators();
        this.calculateSettlementFigures();
    }

    private resetValidators() {
        this.isPaidInvalid = false;
    }

    private calculateSettlementFigures() {
        const amount = this.settlement.amount ?? 0;
        const paid = this.settlement.paid ?? 0;
        let balance = Number(amount) - Number(paid);

        if (paid > amount) {
            balance = 0;
            this.isPaidInvalid = true;
        }
        this.settlement = {...this.settlement, balance: balance};
        this.onNotifyChange();
    }

    private onNotifyChange() {
        this.settlementChange.emit(this.settlement);
    }
}
