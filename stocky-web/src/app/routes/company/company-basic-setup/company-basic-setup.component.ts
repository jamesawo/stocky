import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {COMPANY_BASIC_PROFILE_CRUMB, EXPENSES_SETUP} from '../../../data/constant/crumb.constant';

export type PanelData = {
    active: boolean,
    name: string,
    disabled: boolean,
    tmpl: TemplateRef<any>
}

@Component({
    selector: 'app-company-basic-setup',
    templateUrl: './company-basic-setup.component.html',
    styles: []
})
export class CompanyBasicSetupComponent implements OnInit {
    public panels: PanelData[] = [];
    public crumbs = COMPANY_BASIC_PROFILE_CRUMB;

    @ViewChild('basicTmpl', {static: true}) public basicTmpl!: TemplateRef<any>;
    @ViewChild('administratorTmpl', {static: true}) public administratorTmpl!: TemplateRef<any>;
    @ViewChild('regionTmpl', {static: true}) public regionTmpl!: TemplateRef<any>;
    protected readonly EXPENSES_SETUP = EXPENSES_SETUP;

    public ngOnInit(): void {
        this.panels = [
            {
                active: true,
                name: 'BASIC DETAILS',
                disabled: false,
                tmpl: this.basicTmpl
            },
            {
                active: false,
                disabled: false,
                name: 'ADMINISTRATOR DETAILS',
                tmpl: this.administratorTmpl
            },
            {
                active: false,
                disabled: false,
                name: 'REGION AND LOCALE DETAILS',
                tmpl: this.regionTmpl
            }
        ];

    }
}
