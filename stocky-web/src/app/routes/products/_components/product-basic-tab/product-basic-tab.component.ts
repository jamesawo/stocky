import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ProductPopover} from '../../../../data/constant/message.constant';
import {UtilService} from '../../../../shared/utils/util.service';

@Component({
    selector: 'app-product-basic-tab',
    templateUrl: './product-basic-tab.component.html',
    styles: [
        `
          :host ::ng-deep div[role="alert"] {
            margin-bottom: 25px;
          }
        `
    ]
})
export class ProductBasicTabComponent {
    public popover = ProductPopover;

    @Input()
    public formGroup?: FormGroup;

    constructor(private util: UtilService) {
    }


    public valid(name: string) {
        return this.util.getNzFormControlValidStatus(name, this.getForm());
    }

    public getForm() {
        return this.util.getFormGroupFromParent(this.formGroup!, 'basic');
    }


}
