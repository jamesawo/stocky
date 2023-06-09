import {Component, Input} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';
import {CommonInputProps, PopupViewProps} from '../../../../../data/payload/common.types';

@Component({
    selector: 'app-company-role-add-btn',
    templateUrl: './company-role-add-btn.component.html',
    styles: [
        `.space-t {
          margin-top: -10px;
        }`
    ]
})
export class CompanyRoleAddBtnComponent {
    public showDrawer = false;
    public isLoading = false;
    public showModal = false;
    public categoryForm!: UntypedFormGroup;
    public permissions = [
        {
            active: true,
            name: 'This is panel header 1',
            childPanel: [
                {
                    active: false,
                    name: 'This is panel header 1-1'
                }
            ]
        },
        {
            active: false,
            name: 'This is panel header 2'
        },
        {
            active: false,
            name: 'This is panel header 3'
        }
    ];

    @Input()
    public props: CommonInputProps = {
        size: 'default',
        title: '',
        icon: 'edit',
        showTable: true,
        showForm: true
    };

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
