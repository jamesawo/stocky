import {Component} from '@angular/core';
import {COMPANY_STATUS} from '../../../data/constant/crumb.constant';
import {Crumbs} from '../../../shared/components/breadcrumbs/breadcrumbs.component';

@Component({
    selector: 'app-company-status-setup',
    templateUrl: './company-status-setup.component.html',
    styles: []
})
export class CompanyStatusSetupComponent {

    public crumbs: Crumbs[] = COMPANY_STATUS;
    public isLoading = false;
    public showModal = false;

}
