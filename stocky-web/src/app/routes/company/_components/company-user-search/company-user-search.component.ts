import {Component, Input} from '@angular/core';

export type UserSearchProps = {
    showLabel?: boolean;
}

@Component({
    selector: 'app-company-user-search',
    templateUrl: './company-user-search.component.html',
    styles: []
})
export class CompanyUserSearchComponent {

    @Input()
    public props: UserSearchProps = {showLabel: true};

}
