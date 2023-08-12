import {Component} from '@angular/core';
import {UNIT_OF_MEASURE} from '../../../data/constant/crumb.constant';
import {Crumbs} from '../../../shared/components/breadcrumbs/breadcrumbs.component';

@Component({
    selector: 'app-company-unit-of-measure-setup',
    templateUrl: './company-unit-of-measure-setup.component.html',
    styles: []
})
export class CompanyUnitOfMeasureSetupComponent {

    public crumbs: Crumbs[] = UNIT_OF_MEASURE;
    public isLoading = false;
    public showModal = false;
}
