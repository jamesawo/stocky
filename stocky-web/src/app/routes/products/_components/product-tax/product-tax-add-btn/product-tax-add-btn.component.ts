import {Component} from '@angular/core';

@Component({
    selector: 'app-product-tax-add-btn',
    templateUrl: './product-tax-add-btn.component.html',
    styles: [],
})
export class ProductTaxAddBtnComponent {
    public isVisible = false;
    public showModal = () => (this.isVisible = true);
}
