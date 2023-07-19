import {Component} from '@angular/core';
import {ModalOrDrawer} from '../../../../data/payload/common.enum';
import {CustomerPayload} from '../../../company/_data/company.payload';

@Component({
    selector: 'app-sale-cart',
    templateUrl: './sale-cart.component.html',
    styles: []
})
export class SaleCartComponent {

    public customer: CustomerPayload = new CustomerPayload();
    protected readonly ModalOrDrawer = ModalOrDrawer;


}
