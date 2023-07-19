import {Component} from '@angular/core';
import {CompanyRoutes} from '../../../../data/constant/routes.constant';
import {ModalOrDrawer} from '../../../../data/payload/common.enum';
import {CustomerPayload} from '../../../company/_data/company.payload';

@Component({
    selector: 'app-sale-cart-customer-search',
    templateUrl: './sale-cart-customer-search.component.html',
    styles: []
})
export class SaleCartCustomerSearchComponent {

    protected readonly ModalOrDrawer = ModalOrDrawer;
    protected readonly CompanyRoutes = CompanyRoutes;

    public onCustomerSelected(customer: CustomerPayload) {
        console.log(customer);
    }
}
