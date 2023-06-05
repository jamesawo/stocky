import {Component, Input} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';

@Component({
    selector: 'app-company-expense-add-btn',
    templateUrl: './company-expense-add-btn.component.html',
    styles: []
})
export class CompanyExpenseAddBtnComponent {

    public isExpanded = true;
    public isLoading = false;
    public isLoadingSearch = false;
    public showModal = false;
    public categoryForm!: UntypedFormGroup;

    @Input()
    public props: any;

    public onOpenModal = () => {
        this.showModal = true;
    };

    public onCloseModal = () => {
        this.showModal = false;
    };

    public onCreate = () => {};


}
