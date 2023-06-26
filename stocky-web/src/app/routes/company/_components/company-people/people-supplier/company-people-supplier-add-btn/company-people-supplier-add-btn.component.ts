import {HttpResponse} from '@angular/common/http';
import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {CommonAddProps, PopupViewProps} from 'src/app/data/payload/common.types';
import {ProductRoutes} from '../../../../../../data/constant/routes.constant';
import {ModalOrDrawer, TableButtonEnum} from '../../../../../../data/payload/common.enum';
import {
    getNzFormControlValidStatus,
    handleUsecaseRequest,
    markFormFieldsAsDirtyAndTouched,
    toggleModalOrDrawer
} from '../../../../../../shared/utils/util';
import {SupplierPayload} from '../../../../_data/company.payload';
import {PeopleSupplierUsecase} from '../../../../_usecase/people-supplier.usecase';


@Component({
    selector: 'app-company-people-supplier-add-btn',
    templateUrl: './company-people-supplier-add-btn.component.html',
    styles: []
})
export class CompanyPeopleSupplierAddBtnComponent {
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
    protected readonly getNzFormControlValidStatus = getNzFormControlValidStatus;
    protected readonly PRODUCT_ROUTES = ProductRoutes;

    constructor(
        private fb: FormBuilder,
        private usecase: PeopleSupplierUsecase,
        private notification: NzNotificationService
    ) {}

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
        const {showDrawer, showModal} = toggleModalOrDrawer(type, this.showDrawer, this.showModal);
        this.showDrawer = showDrawer;
        this.showModal = showModal;
    };

    public onCreate = async () => {
        if (this.form.invalid) {
            markFormFieldsAsDirtyAndTouched(this.form);
            return;
        }

        this.isLoading = true;
        const formSubmission = <SupplierPayload>this.form.value;
        const response = await handleUsecaseRequest(this.usecase.save(formSubmission), this.notification);
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
