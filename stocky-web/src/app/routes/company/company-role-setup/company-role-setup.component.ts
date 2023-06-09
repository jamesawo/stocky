import {Component} from '@angular/core';
import {of} from 'rxjs';
import {TableCol} from '../../../shared/components/table/table.component';

@Component({
    selector: 'app-company-role-setup',
    templateUrl: './company-role-setup.component.html',
    styles: []
})
export class CompanyRoleSetupComponent {

    public isOpenHeader = true;

    public tableCols: TableCol[] = [
        {title: 'Title'},
        {title: 'Description'},
        {title: 'Created Date'},
        {title: 'Permissions '},
        {title: 'Action'}
    ];

    public list = of(Array(1));
}
