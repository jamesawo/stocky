import {HttpResponse} from '@angular/common/http';
import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {CommonAddProps, PopupViewProps} from 'src/app/data/payload/common.types';
import {ModalOrDrawer} from '../../../../../../data/payload/common.enum';
import {handleUsecaseRequest, markFormFieldsAsDirtyAndTouched, toggleModalOrDrawer} from '../../../../../../shared/utils/util';
import {CustomerPayload} from '../../../../_data/company.payload';
import {PeopleCustomerUsecase} from '../../../../_usecase/people-customer.usecase';

export type ExpensesAddBtnProps = {
    showTable?: boolean;
    showForm?: boolean
}

@Component({
    selector: 'app-company-people-customer-add-btn',
    templateUrl: './company-people-customer-add-btn.component.html',
    styles: []
})
export class CompanyPeopleCustomerAddBtnComponent {
    @Input()
    public customer: CustomerPayload = new CustomerPayload();

    @Input()
    public props: CommonAddProps = {};

    @Input()
    public popup: PopupViewProps = {display: ModalOrDrawer.DRAWER};

    public showDrawer = false;
    public isLoading = false;
    public showModal = false;
    public form: FormGroup = this.formBuild;
    public pageTitle = 'Add New Customer';

    protected readonly ModalOrDrawer = ModalOrDrawer;

    constructor(
        private fb: FormBuilder,
        private usecase: PeopleCustomerUsecase,
        private notification: NzNotificationService
    ) {}

    public get formBuild() {
        return this.fb.group({
            id: [this.customer.id],
            customerFirstName: [this.customer.customerFirstName, [Validators.required]],
            customerLastName: [this.customer.customerLastName, []],
            customerEmail: [this.customer.customerEmail, []],
            customerPhone: [this.customer.customerPhone, []],
            customerAddress: [this.customer.customerAddress, []],
            customerTag: [this.customer.customerTag, [Validators.required]]
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

        const customer = <CustomerPayload>this.form.value;
        const response = await handleUsecaseRequest(this.usecase.save(customer), this.notification);
        this.onAfterSubmission(response);
    };

    private onAfterSubmission(response: HttpResponse<CustomerPayload>) {
        if (response.ok) {
            this.toggle(ModalOrDrawer.ANY);
        }
    }
}
