import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ProductPopover} from '../../../../data/constant/message.constant';
import {calculateSellingPrice, getFormGroupFromParent} from '../../../../shared/utils/util';

@Component({
    selector: 'app-product-price-tab',
    templateUrl: './product-price-tab.component.html',
    styles: []
})
export class ProductPriceTabComponent {
    public popover = ProductPopover;

    @Input()
    public formGroup?: FormGroup;
    protected readonly getSubFormGroup = getFormGroupFromParent;

    public getForm(): FormGroup<any> {
        return getFormGroupFromParent(this.formGroup!, 'price');
    }

    public calculateSellingPrice() {
        if (this.formGroup) {
            const form = this.getForm();
            const costPrice = form.get('costPrice')?.value;
            const markupPercent = form.get('markup')?.value;
            form.get('sellingPrice')?.setValue(calculateSellingPrice(costPrice, markupPercent));
        }
    }
}
