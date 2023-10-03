import {HttpResponse} from '@angular/common/http';
import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NzDrawerService} from 'ng-zorro-antd/drawer';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {CommonAddProps, PopupViewProps} from 'src/app/data/payload/common.types';
import {MenuRoute} from '../../../../../../data/constant/menu.payload';
import {ModalOrDrawer, NokRelationship} from '../../../../../../data/payload/common.enum';
import {CommonPayload} from '../../../../../../data/payload/common.payload';
import {UtilService} from '../../../../../../shared/utils/util.service';
import {EmployeePayload} from '../../../../_data/company.payload';
import {PeopleEmployeeUsecase} from '../../../../_usecase/people-employee.usecase';


@Component({
    selector: 'app-company-people-employee-add-btn',
    templateUrl: './company-people-employee-add-btn.component.html',
    styles: []
})
export class CompanyPeopleEmployeeAddBtnComponent implements OnInit, OnChanges {
    @Input()
    public employee? = new EmployeePayload();
    @Input()
    public props: CommonAddProps = {};
    @Input()
    public popup: PopupViewProps = {display: ModalOrDrawer.DRAWER};

    public showDrawer = false;
    public isLoading = false;
    public showModal = false;
    public form: FormGroup = this.fb.group({});
    public relationshipsWithNok: CommonPayload[] = this.relationshipFromEnum;
    public isUpdating = false;
    public expiryDate = '';
    public dateOfBirth = '';
    public nzDrawerWidth = 350;

    protected readonly ModalOrDrawer = ModalOrDrawer;
    protected readonly getNzFormControlValidStatus = this.util.getNzFormControlValidStatus;

    constructor(
        private fb: FormBuilder,
        private usecase: PeopleEmployeeUsecase,
        private notification: NzNotificationService,
        private util: UtilService,
        private router: Router,
        private modal: NzModalService,
        private nzDrawerService: NzDrawerService
    ) {
        this.nzDrawerWidth = this.util.calculateDrawerWidth();
    }

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

    public get drawerWidth() {
        return this.util.calculateDrawerWidth();
    }

    private get relationshipFromEnum(): CommonPayload[] {
        return Object.keys(NokRelationship).map((value, index) => {
            return {title: value, id: index++};
        });

    }

    public ngOnInit() {
        this.resetForm();
    }

    public ngOnChanges(changes: SimpleChanges) {
        let employeeChange: any = changes['employee'];
        if (employeeChange && employeeChange.currentValue) {
            this.employee = employeeChange.currentValue;
            this.resetForm();
        }
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
        const submission = this.form.value;
        await this.saveOrUpdateRecord(submission);
    };

    public getFormGroup(group: string): FormGroup {
        return <FormGroup>this.form.get(group);
    }

    public routeToAuthentication(): void {
        this.modal.confirm({
            nzTitle: 'Are you sure you want to leave this page?',
            nzOnOk: () => {this.router.navigateByUrl(MenuRoute.AUTHENTICATION.Account).then();},
            nzOnCancel: () => {this.modal.closeAll();}
        }, 'warning');
    }

    public onAccountExpirationDateChange(date: string): void {
        if (date) {
            this.expiryDate = date;
            this.getFormGroup('accountDetail').controls['expirationDate'].setValue(date);
        }
    }

    public onDateOfBirthChange(date: string): void {
        if (date) {
            this.dateOfBirth = date;
            this.getFormGroup('personalDetail').controls['employeeDateOfBirth'].setValue(date);
        }
    }

    private onHandleSaveResponse<T>(response: HttpResponse<T>) {
        this.isLoading = false;
        if (response && response.ok && response.body) {
            this.isUpdating = false;
            this.toggle(ModalOrDrawer.ANY);
        }
    }

    private async saveOrUpdateRecord(record: EmployeePayload) {
        if (this.isUpdating && this.employee && this.employee.id) {
            record.id = this.employee.id;
            const response = await this.util.handleUsecaseRequest(this.usecase.update(record), this.notification);
            this.onHandleSaveResponse(response);
        } else {
            const response = await this.util.handleUsecaseRequest(this.usecase.save(record), this.notification);
            this.onHandleSaveResponse(response);
        }
    }

    private resetForm() {
        this.form = this.fb.group({});
        this.form = this.formBuild;
    }
}
