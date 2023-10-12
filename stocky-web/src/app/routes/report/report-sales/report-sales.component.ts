import {Component} from '@angular/core';
import {REPORT_SALES} from '../../../data/constant/crumb.constant';

@Component({
    selector: 'app-report-sales',
    templateUrl: './report-sales.component.html',
    styles: []
})
export class ReportSalesComponent {
    public crumbs = REPORT_SALES;
}
