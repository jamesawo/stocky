import {HttpResponse} from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {CommonAddProps, PopupViewProps} from 'src/app/data/payload/common.types';
import {ProductRoutes} from '../../../../../../data/constant/routes.constant';
import {ModalOrDrawer, TableButtonEnum} from '../../../../../../data/payload/common.enum';
import {UtilService} from '../../../../../../shared/utils/util.service';
import {SupplierPayload} from '../../../../_data/company.payload';
import {PeopleSupplierUsecase} from '../../../../_usecase/people-supplier.usecase';
import {ResponsiveService} from "../../../../../../shared/utils/responsive.service";


@Component({
    selector: 'app-company-people-supplier-add-btn',
    templateUrl: './company-people-supplier-add-btn.component.html',
    styles: []
})
export class CompanyPeopleSupplierAddBtnComponent implements OnInit {
    public pageTitle = 'Add New Supplier';
    public isLoading = false;

    @Input()
    public supplier = new SupplierPayload();

    public showDrawer = false;
    public showModal = false;
    public form: FormGroup = this.buildForm;
    @Input()
    public props: CommonAddProps = {};
    @Input()
    public popup: PopupViewProps = {display: ModalOrDrawer.DRAWER};
    protected readonly TableButtonEnum = TableButtonEnum;
    protected readonly ModalOrDrawer = ModalOrDrawer;
    protected readonly getNzFormControlValidStatus = this.util.getNzFormControlValidStatus;
    protected readonly PRODUCT_ROUTES = ProductRoutes;
    public drawerSize = 350;

    constructor(
        private fb: FormBuilder,
        private usecase: PeopleSupplierUsecase,
        private notification: NzNotificationService,
        private util: UtilService,
        private responsiveService: ResponsiveService) {
    }

    ngOnInit() {
        this.responsiveService.screenWidth$.subscribe(value => {
            this.drawerSize = this.responsiveService.calculateDrawerWidth(value);
        })
    }

    private get buildForm() {
        return this.fb.group({
            id: [this.supplier?.id, []],
            supplierBusinessName: [this.supplier?.supplierBusinessName, [Validators.required]],
            supplierFirstName: [this.supplier?.supplierFirstName, [Validators.required]],
            supplierLastName: [this.supplier?.supplierLastName, []],
            supplierEmailAddress: [this.supplier?.supplierEmailAddress, []],
            supplierPhone: [this.supplier?.supplierPhone, [Validators.required]],
            supplierOfficeAddress: [this.supplier?.supplierOfficeAddress, []],
            categories: [this.supplier?.categories, [Validators.required]]
        });
    }

    public toggle = (type = this.popup.display) => {
        const {showDrawer, showModal} = this.util.toggleModalOrDrawer(type, this.showDrawer, this.showModal);
        this.showDrawer = showDrawer;
        this.showModal = showModal;
    };

    public onCreate = async () => {
        if (this.form.invalid) {
            this.util.markFormFieldsAsDirtyAndTouched(this.form);
            return;
        }

        this.isLoading = true;
        const formSubmission = <SupplierPayload>this.form.value;
        const response = await this.util.handleUsecaseRequest(this.usecase.save(formSubmission), this.notification);
        this.onAfterSave(response);
    };


    private onAfterSave(response: HttpResponse<SupplierPayload>) {
        this.isLoading = false;
        if (response.ok) {
            this.form.reset();
            this.form = this.buildForm;
            this.toggle(ModalOrDrawer.ANY);
        }
    }
}
