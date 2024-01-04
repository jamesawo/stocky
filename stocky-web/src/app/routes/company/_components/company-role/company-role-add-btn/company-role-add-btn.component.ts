import {HttpResponse} from '@angular/common/http';
import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ModalOrDrawer} from '../../../../../data/payload/common.enum';
import {CommonInputProps, PopupViewProps} from '../../../../../data/payload/common.types';
import {UtilService} from '../../../../../shared/utils/util.service';
import {RolePayload} from '../../../_data/company.payload';
import {CompanyRoleFormComponent} from '../company-role-form/company-role-form.component';
import {ResponsiveService} from "../../../../../shared/utils/responsive.service";

@Component({
    selector: 'app-company-role-add-btn',
    templateUrl: './company-role-add-btn.component.html',
    styles: [`.space-t {
        margin-top: -10px;
    }`]
})
export class CompanyRoleAddBtnComponent implements OnChanges, OnInit {
    public showDrawer = false;
    public showModal = false;
    public isSaving = false;
    public drawerSize = 350;


    @ViewChild('roleFormComponent')
    public roleFormComponent?: CompanyRoleFormComponent;

    @Input()
    public role?: RolePayload;

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

    constructor(
        private util: UtilService,
        private responsiveService: ResponsiveService
    ) {
    }

    get isDrawer() {
        return this.popup.display == ModalOrDrawer.DRAWER;
    }

    ngOnInit() {
        this.responsiveService.screenWidth$.subscribe(value => {
            this.drawerSize = this.responsiveService.calculateDrawerWidth(value);
        })
    }

    public ngOnChanges(changes: SimpleChanges) {
        let currentRoleValue = changes['role'].currentValue;
        if (currentRoleValue) {
            this.isDrawer ? this.showDrawer = true : this.showModal = true;
        }
    }

    public toggle = (type = this.popup.display) => {
        const {showDrawer, showModal} = this.util.toggleModalOrDrawer(type, this.showDrawer, this.showModal);
        this.showDrawer = showDrawer;
        this.showModal = showModal;
    };

    public onCreate = () => {
        this.isSaving = true;
        this.roleFormComponent?.onSave().then(r => this.isSaving = false);
    };

    public onHandleFormEmit(response: HttpResponse<RolePayload>) {
        if (response.ok) {
            this.toggle(ModalOrDrawer.ANY);
        }
    }
}
