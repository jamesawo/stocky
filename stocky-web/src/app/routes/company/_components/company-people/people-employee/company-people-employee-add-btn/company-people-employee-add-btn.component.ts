import {Component, Input} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';
import {CommonAddProps, PopupViewProps} from 'src/app/data/payload/common.types';
import {ModalOrDrawer} from '../../../../../../data/payload/common.enum';
import {toggleModalOrDrawer} from '../../../../../../shared/utils/util';

export type ExpensesAddBtnProps = {
    showTable?: boolean;
    showForm?: boolean
}

@Component({
    selector: 'app-company-people-employee-add-btn',
    templateUrl: './company-people-employee-add-btn.component.html',
    styles: []
})
export class CompanyPeopleEmployeeAddBtnComponent {
    public showDrawer = false;
    public isLoading = false;
    public showModal = false;
    public categoryForm!: UntypedFormGroup;

    @Input()
    public props: CommonAddProps = {};

    @Input()
    public popup: PopupViewProps = {display: ModalOrDrawer.DRAWER};
    protected readonly ModalOrDrawer = ModalOrDrawer;

    public toggle = (type = this.popup.display) => {
        const {showDrawer, showModal} = toggleModalOrDrawer(type, this.showDrawer, this.showModal);
        this.showDrawer = showDrawer;
        this.showModal = showModal;
    };

    public onCreate = () => {};
}
