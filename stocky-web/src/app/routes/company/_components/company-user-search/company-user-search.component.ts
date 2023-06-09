import {Component, Input} from '@angular/core';
import {SearchProps} from '../../../../data/payload/common.types';

@Component({
    selector: 'app-company-user-search',
    templateUrl: './company-user-search.component.html',
    styles: []
})
export class CompanyUserSearchComponent {

    @Input()
    public props: SearchProps = {showLabel: true};

}
