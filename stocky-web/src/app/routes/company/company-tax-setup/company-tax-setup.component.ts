import {Component} from '@angular/core';
import {TAX_SETUP} from '../../../data/constant/crumb.constant';
import {Crumbs} from '../../../shared/components/breadcrumbs/breadcrumbs.component';

@Component({
    selector: 'app-company-tax-setup',
    templateUrl: './company-tax-setup.component.html',
    styles: []
})
export class CompanyTaxSetupComponent {
    public crumbs: Crumbs[] = TAX_SETUP;
    public isLoading = false;
    public showModal = false;
    
}
