import {HttpResponse} from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {CommonAddProps, CommonInputProps, PopupViewProps} from 'src/app/data/payload/common.types';
import {ModalOrDrawer} from '../../../../../../data/payload/common.enum';
import {ResponsiveService} from '../../../../../../shared/utils/responsive.service';
import {UtilService} from '../../../../../../shared/utils/util.service';
import {CustomerPayload} from '../../../../_data/company.payload';
import {PeopleCustomerUsecase} from '../../../../_usecase/people-customer.usecase';
import {CustomerSaveLocationEnum} from "../../../../_data/company.enum";


@Component({
    selector: 'app-company-people-customer-add-btn',
    templateUrl: './company-people-customer-add-btn.component.html',
    styles: []
})
export class CompanyPeopleCustomerAddBtnComponent implements OnInit {
    @Input()
    public customer: CustomerPayload = new CustomerPayload();

    @Input()
    public props: CommonAddProps = {};

    @Input()
    public popup: PopupViewProps = {display: ModalOrDrawer.DRAWER};

    @Input()
    public buttonProps: CommonInputProps = {size: 'large'};

    @Input()
    public saveLocation?: CustomerSaveLocationEnum;

    public showDrawer = false;
    public isLoading = false;
    public showModal = false;
    public form: FormGroup = this.formBuild;
    public pageTitle = 'Add New Customer';
    public screenWidth?: number;


    protected readonly ModalOrDrawer = ModalOrDrawer;

    constructor(
        private fb: FormBuilder,
        private usecase: PeopleCustomerUsecase,
        private notification: NzNotificationService,
        private responsiveService: ResponsiveService,
        private util: UtilService
    ) {
    }

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

    public calculateDrawerWidth(screenWidth: number): void {
        if (screenWidth && screenWidth < 700) {
            this.screenWidth = 350;
        } else {
            this.screenWidth = 750;
        }
    }

    public ngOnInit(): void {
        this.responsiveService.screenWidth$.subscribe(value => {
            this.calculateDrawerWidth(value);
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

        const customer = <CustomerPayload>this.form.value;
        const response = await this.util.handleUsecaseRequest(this.usecase.save(customer), this.notification);
        this.onAfterSubmission(response);
    };

    private onAfterSubmission(response: HttpResponse<CustomerPayload>) {
        if (response.ok) {
            this.notifySalesPoint(response);
            this.form.reset();
            this.toggle(ModalOrDrawer.ANY);
        }
    }

    private notifySalesPoint(response: HttpResponse<CustomerPayload>) {
        if (response.body && response.body.id) {
            if (this.saveLocation != undefined && this.saveLocation === CustomerSaveLocationEnum.SALES_POINT) {
                this.usecase.setCustomer({from: CustomerSaveLocationEnum.SALES_POINT, customer: response.body});
            }
        }
    }
}
