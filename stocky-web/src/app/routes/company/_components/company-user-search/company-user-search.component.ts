import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormProps, SearchProps} from '../../../../data/payload/common.types';
import {UserPayload} from '../../_data/company.payload';

@Component({
    selector: 'app-company-user-search',
    templateUrl: './company-user-search.component.html',
    styles: []
})
export class CompanyUserSearchComponent {

    @Input()
    public formProps?: FormProps;

    @Input()
    public props: SearchProps = {showLabel: true};

    @Input()
    public select?: UserPayload;

    @Output()
    public selectChange = new EventEmitter<UserPayload>();

}
