import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonPayload} from '../../../../../data/payload/common.payload';
import {FormProps} from '../../../../../data/payload/common.types';

export const expensesCategoryData: CommonPayload[] = [
    {title: 'FOOD', id: 1},
    {title: 'TRANSPORT', id: 2},
    {title: 'FUEL', id: 3},
    {title: 'PURCHASE', id: 4},
    {title: 'MAINTENANCE', id: 5}
];

@Component({
    selector: 'app-company-expense-category-dropdown',
    templateUrl: './company-expense-category-dropdown.component.html',
    styles: []
})
export class CompanyExpenseCategoryDropdownComponent {
    @Input()
    public formProps?: FormProps;

    @Input()
    public props: {showLabel: boolean} = {showLabel: false};

    public list = expensesCategoryData;

    @Input()
    public select?: CommonPayload;

    @Output()
    public selectChange = new EventEmitter<CommonPayload>();

    public onCategorySelected(selected: CommonPayload) {
        if (selected) {
            this.selectChange.emit(selected);
        }
    }

}
