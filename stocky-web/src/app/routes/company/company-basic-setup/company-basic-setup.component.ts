import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

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

    @ViewChild('basicTmpl', {static: true}) public basicTmpl!: TemplateRef<any>;
    @ViewChild('administratorTmpl', {static: true}) public administratorTmpl!: TemplateRef<any>;
    @ViewChild('regionTmpl', {static: true}) public regionTmpl!: TemplateRef<any>;


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
