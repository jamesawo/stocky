import {Component} from '@angular/core';
import {COMPANY_PAYMENT_OPTION_SETUP_CRUMB} from '../../../data/constant/crumb.constant';

@Component({
    selector: 'app-company-payment-options',
    templateUrl: './company-payment-options.component.html',
    styles: []
})
export class CompanyPaymentOptionsComponent {
    public crumbs = COMPANY_PAYMENT_OPTION_SETUP_CRUMB;

}
