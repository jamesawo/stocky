import {Component, Input} from '@angular/core';
import {CommonInputProps} from '../../../../../data/payload/common.types';

@Component({
    selector: 'app-company-expense-category-add-btn',
    templateUrl: './company-expense-category-add-btn.component.html',
    styles: []
})
export class CompanyExpenseCategoryAddBtnComponent {

    @Input()
    public props: CommonInputProps = {
        size: 'default',
        title: '',
        icon: 'edit',
        showTable: true,
        showForm: true
    };

    public isVisible = false;

    public showModal = () => (this.isVisible = true);

}
