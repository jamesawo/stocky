import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AmountRangeParam} from '../../../data/param/common.param';

@Component({
    selector: 'app-amount-range',
    templateUrl: './amount-range.component.html',
    styles: [`
      ::ng-deep .switch > nz-switch > button {
      }
    `]
})
export class AmountRangeComponent {

    @Input()
    public value: AmountRangeParam = new AmountRangeParam();

    @Output()
    public valueChange = new EventEmitter<AmountRangeParam>();


    public onAmountChange() {
        this.valueChange.emit(this.value);
    }

}
