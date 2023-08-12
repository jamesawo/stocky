import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-product-status-add-btn',
    templateUrl: './product-status-add-btn.component.html',
    styles: []
})
export class ProductStatusAddBtnComponent {
    @Input()
    public buttonText = 'Add New';

    @Input()
    public buttonIcon = 'edit';

    @Input()
    public showTable = false;
    
    public isVisible = false;
    public showModal = () => (this.isVisible = true);
}
