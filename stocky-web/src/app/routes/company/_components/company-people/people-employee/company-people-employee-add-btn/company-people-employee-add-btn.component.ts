import {Component, Input} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';
import {CommonAddProps, PopupViewProps} from '../../../../data/payload/common.types';

export type ExpensesAddBtnProps = {
    showTable?: boolean;
    showForm?: boolean
}

@Component({
    selector: 'app-company-expense-add-btn',
    templateUrl: './company-expense-add-btn.component.html',
    styles: []
})
export class CompanyExpenseAddBtnComponent {
    public showDrawer = false;
    public isLoading = false;
    public showModal = false;
    public categoryForm!: UntypedFormGroup;

    @Input()
    public props: CommonAddProps = {};

    @Input()
    public popup: PopupViewProps = {display: 'drawer'};

    get isDrawer() {
        return this.popup.display == 'drawer';
    }

    public onOpenDrawer = () => {
        this.showDrawer = true;
    };

    public onCloseDrawer = () => {
        this.showDrawer = false;
    };

    public onOpenModal = () => {
        this.showModal = true;
    };

    public onCloseModal = () => {
        this.showModal = false;
    };

    public onCreate = () => {};


}
