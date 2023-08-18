import {Component} from '@angular/core';
import {COMPANY_LOCATION_SETUP_CRUMB} from '../../../data/constant/crumb.constant';

@Component({
    selector: 'app-company-location-setup',
    templateUrl: './company-location-setup.component.html',
    styles: []
})
export class CompanyLocationSetupComponent {

    public crumbs = COMPANY_LOCATION_SETUP_CRUMB;

}
