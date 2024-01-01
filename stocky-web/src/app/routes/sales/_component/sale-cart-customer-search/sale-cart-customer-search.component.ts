import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CompanyRoutes} from '../../../../data/constant/routes.constant';
import {ModalOrDrawer} from '../../../../data/payload/common.enum';
import {CustomerPayload} from '../../../company/_data/company.payload';
import {SaleCart} from '../../_data/sale-cart.payload';
import {SaleCartUsecase} from '../../_usecase/sale-cart.usecase';
import {
    SearchModelDropdownComponent
} from "../../../../shared/components/search-model-dropdown/search-model-dropdown.component";
import {PeopleCustomerUsecase} from "../../../company/_usecase/people-customer.usecase";
import {CustomerSaveLocationEnum} from "../../../company/_data/company.enum";
import {CustomerNotifier} from "../../../../data/payload/common.interface";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-sale-cart-customer-search',
    templateUrl: './sale-cart-customer-search.component.html',
    styles: []
})
export class SaleCartCustomerSearchComponent implements OnInit, OnDestroy {
    @ViewChild('searchModelDropdownComponent', {static: true})
    salesModelDropdown?: SearchModelDropdownComponent;

    public cart?: SaleCart;
    protected readonly ModalOrDrawer = ModalOrDrawer;
    protected readonly CompanyRoutes = CompanyRoutes;
    salesPoint: CustomerSaveLocationEnum = CustomerSaveLocationEnum.SALES_POINT;

    private subscription = new Subscription();

    constructor(
        private cartUsecase: SaleCartUsecase,
        private customerUsecase: PeopleCustomerUsecase,
    ) {
    }

    public ngOnInit(): void {
        this.subscription.add(this.cartUsecase.cart$.subscribe(value => this.cart = value));
        this.subscription.add(this.customerUsecase.customer$.subscribe(value => this.onNotifyCustomerSave(value)))
    }

    public onCustomerSelected(customer: CustomerPayload) {
        if (this.cart && customer) {
            this.cart.customer = customer;
        }
    }

    private onNotifyCustomerSave(value: CustomerNotifier) {
        if (value && value.from === CustomerSaveLocationEnum.SALES_POINT) {
            const customer = value.customer;
            if (customer && customer.id && customer.customerFirstName && customer.customerPhone) {
                if (this.salesModelDropdown) {
                    this.salesModelDropdown.value = [customer];
                    this.salesModelDropdown.defaultValues = customer;
                    this.onCustomerSelected(customer);
                }
            }
        }
    }

    ngOnDestroy(): void {
        this.customerUsecase.setCustomer({});
        this.subscription.unsubscribe();
    }
}
