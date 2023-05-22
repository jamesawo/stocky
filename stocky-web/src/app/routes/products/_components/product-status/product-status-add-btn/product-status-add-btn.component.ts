import {Component} from '@angular/core';

@Component({
    selector: 'app-product-status-add-btn',
    templateUrl: './product-status-add-btn.component.html',
    styles: [],
})
export class ProductStatusAddBtnComponent {
    public isVisible = false;
    public showModal = () => (this.isVisible = true);
}
