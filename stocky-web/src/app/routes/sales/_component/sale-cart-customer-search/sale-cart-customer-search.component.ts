import {Component, OnInit} from '@angular/core';
import {CompanyRoutes} from '../../../../data/constant/routes.constant';
import {ModalOrDrawer} from '../../../../data/payload/common.enum';
import {CustomerPayload} from '../../../company/_data/company.payload';
import {SaleCart} from '../../_data/sale-cart.payload';
import {SaleCartUsecase} from '../../_usecase/sale-cart.usecase';

@Component({
    selector: 'app-sale-cart-customer-search',
    templateUrl: './sale-cart-customer-search.component.html',
    styles: []
})
export class SaleCartCustomerSearchComponent implements OnInit {

    public cart?: SaleCart;
    protected readonly ModalOrDrawer = ModalOrDrawer;
    protected readonly CompanyRoutes = CompanyRoutes;

    constructor(private cartUsecase: SaleCartUsecase) {}


    public onCustomerSelected(customer: CustomerPayload) {
        if (this.cart && customer) {
            this.cart.customer = customer;
        }
    }

    public ngOnInit(): void {
        this.cartUsecase.cart$.subscribe(value => this.cart = value);
    }
}
