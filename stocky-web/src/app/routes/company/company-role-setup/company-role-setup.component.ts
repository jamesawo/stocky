import {Component, OnInit} from '@angular/core';
import {COMPANY_ROLE_SETUP_CRUMB} from '../../../data/constant/crumb.constant';
import {Crumbs} from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import {RolePayload} from '../_data/company.payload';

@Component({
    selector: 'app-company-role-setup',
    templateUrl: './company-role-setup.component.html',
    styles: []
})
export class CompanyRoleSetupComponent implements OnInit {
    public selectedRole?: RolePayload;
    public crumbs: Crumbs[] = COMPANY_ROLE_SETUP_CRUMB;

    public ngOnInit() {
    }

    public handleRoleEdit(role: RolePayload) {
        this.selectedRole = role;
    }
}
