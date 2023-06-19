import {HttpResponse} from '@angular/common/http';
import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {CommonAddProps, PopupViewProps} from 'src/app/data/payload/common.types';
import {ModalOrDrawer, NokRelationship} from '../../../../../../data/payload/common.enum';
import {CommonPayload} from '../../../../../../data/payload/common.payload';
import {
    getNzFormControlValidStatus,
    handleUsecaseRequest,
    markFormFieldsAsDirtyAndTouched,
    toggleModalOrDrawer
} from '../../../../../../shared/utils/util';
import {EmployeePayload} from '../../../../_data/company.payload';
import {PeopleEmployeeUsecase} from '../../../../_usecase/people-employee.usecase';


@Component({
    selector: 'app-company-people-employee-add-btn',
    templateUrl: './company-people-employee-add-btn.component.html',
    styles: []
})
export class CompanyPeopleEmployeeAddBtnComponent {
    public showDrawer = false;
    public isLoading = false;
    public showModal = false;
    public form: FormGroup = this.formBuild;
    public relationshipsWithNok: CommonPayload[] = this.relationshipFromEnum;
    @Input()
    public employee = new EmployeePayload();
    @Input()
    public props: CommonAddProps = {};
    @Input()
    public popup: PopupViewProps = {display: ModalOrDrawer.DRAWER};
    protected readonly ModalOrDrawer = ModalOrDrawer;
    protected readonly getNzFormControlValidStatus = getNzFormControlValidStatus;

    constructor(
        private fb: FormBuilder,
        private usecase: PeopleEmployeeUsecase,
        private notification: NzNotificationService
    ) {}

    public get formBuild() {
        return this.fb.group({
            id: [],
            personalDetail: this.fb.group({
                employeeFirstName: [this.employee?.personalDetail?.employeeFirstName, [Validators.required]],
                employeeLastName: [this.employee?.personalDetail?.employeeLastName, []],
                employeeEmail: [this.employee?.personalDetail?.employeeEmail, []],
                employeePhone: [this.employee?.personalDetail?.employeePhone, [Validators.required]],
                employeeAddress: [this.employee?.personalDetail?.employeeAddress, []],
                employeeDateOfBirth: [this.employee?.personalDetail?.employeeDateOfBirth, []]
            }),

            nokDetail: this.fb.group({
                nokFullName: [this.employee?.nokDetail?.nokFullName, []],
                nokPhone: [this.employee?.nokDetail?.nokPhone, []],
                nokAddress: [this.employee?.nokDetail?.nokAddress, []],
                nokEmail: [this.employee?.nokDetail?.nokEmail, []],
                nokRelationship: [this.employee?.nokDetail?.nokRelationship, []]
            }),
            accountDetail: this.fb.group({
                username: [this.employee?.accountDetail?.username, [Validators.required]],
                password: [this.employee?.accountDetail?.password, [Validators.required]],
                roles: [this.employee?.accountDetail?.roles, [Validators.required]],
                expirationDate: [this.employee?.accountDetail?.expirationDate, [Validators.required]]
            })
        });
    }

    private get relationshipFromEnum(): CommonPayload[] {
        return Object.keys(NokRelationship).map((value, index) => {
            return {title: value, id: index++};
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
        const submission = this.form.value;
        const response = await handleUsecaseRequest(this.usecase.save(submission), this.notification);
        this.onHandleSaveResponse(response);
    };

    public getFormGroup(group: string): FormGroup {
        return <FormGroup>this.form.get(group);
    }

    public onHandleSaveResponse(response: HttpResponse<EmployeePayload>) {
        this.isLoading = false;
        if (response && response.ok) {
            this.toggle(ModalOrDrawer.ANY);
        }
    }
}
