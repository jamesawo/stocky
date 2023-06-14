import {HttpResponse} from '@angular/common/http';
import {Component, Input, ViewChild} from '@angular/core';
import {ModalOrDrawer} from '../../../../../data/payload/common.enum';
import {CommonInputProps, PopupViewProps} from '../../../../../data/payload/common.types';
import {toggleModalOrDrawer} from '../../../../../shared/utils/util';
import {RolePayload} from '../../../_data/company.payload';
import {CompanyRoleFormComponent} from '../company-role-form/company-role-form.component';

@Component({
    selector: 'app-company-role-add-btn',
    templateUrl: './company-role-add-btn.component.html',
    styles: [`.space-t {
      margin-top: -10px;
    }`]
})
export class CompanyRoleAddBtnComponent {
    public showDrawer = false;
    public showModal = false;

    @ViewChild('roleFormComponent')
    public roleFormComponent?: CompanyRoleFormComponent;


    @Input()
    public props: CommonInputProps = {
        size: 'default',
        title: '',
        icon: 'edit',
        showTable: true,
        showForm: true
    };

    @Input()
    public popup: PopupViewProps = {display: ModalOrDrawer.DRAWER};

    protected readonly ModalOrDrawer = ModalOrDrawer;

    get isDrawer() {
        return this.popup.display == ModalOrDrawer.DRAWER;
    }


    public toggle = (type = this.popup.display) => {
        const {showDrawer, showModal} = toggleModalOrDrawer(type, this.showDrawer, this.showModal);
        this.showDrawer = showDrawer;
        this.showModal = showModal;
    };

    public onCreate = () => {
        this.roleFormComponent?.onSave();
    };


    public onHandleFormEmit(response: HttpResponse<RolePayload>) {
        if (response.ok) {
            this.toggle(ModalOrDrawer.ANY);
        }
    }
}
