import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ProductPopover} from '../../../../data/constant/message.constant';
import {UtilService} from '../../../../shared/utils/util.service';

@Component({
    selector: 'app-product-price-tab',
    templateUrl: './product-price-tab.component.html',
    styles: []
})
export class ProductPriceTabComponent {
    public popover = ProductPopover;

    @Input()
    public formGroup?: FormGroup;
    protected readonly getSubFormGroup = this.util.getFormGroupFromParent;

    constructor(private util: UtilService) {}

    public getForm(): FormGroup<any> {
        return this.util.getFormGroupFromParent(this.formGroup!, 'price');
    }

    public calculateSellingPrice() {
        if (this.formGroup) {
            const form = this.getForm();
            const costPrice = form.get('costPrice')?.value;
            const markupPercent = form.get('markup')?.value;
            form.get('sellingPrice')?.setValue(UtilService.calculateSellingPrice(costPrice, markupPercent));
        }
    }
}
