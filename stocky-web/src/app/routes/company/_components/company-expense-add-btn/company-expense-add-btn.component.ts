import {HttpResponse} from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {ModalOrDrawer} from '../../../../data/payload/common.enum';
import {CommonAddProps, PopupViewProps} from '../../../../data/payload/common.types';
import {UtilService} from '../../../../shared/utils/util.service';
import {ExpensesPayload} from '../../_data/company.payload';
import {ExpensesUsecase} from '../../_usecase/company-expenses/expenses.usecase';
import {ResponsiveService} from "../../../../shared/utils/responsive.service";

@Component({
    selector: 'app-company-expense-add-btn',
    templateUrl: './company-expense-add-btn.component.html',
    styles: []
})
export class CompanyExpenseAddBtnComponent implements OnInit {
    public showDrawer = false;
    public isLoading = false;
    public showModal = false;
    public categoryForm: FormGroup = this.formBuild;
    public drawerSize = 350;

    @Input()
    public props: CommonAddProps = {};

    @Input()
    public popup: PopupViewProps = {display: ModalOrDrawer.DRAWER};
    public defaultDate: string = '';
    protected readonly isFormControlInvalid = this.util.isFormControlInvalid;
    protected readonly ModalOrDrawer = ModalOrDrawer;

    constructor(
        private fb: FormBuilder,
        private usecase: ExpensesUsecase,
        private notification: NzNotificationService,
        private util: UtilService,
        private responsiveService: ResponsiveService
    ) {
        this.defaultDate = this.util.getDateString();
    }

    ngOnInit() {
        this.responsiveService.screenWidth$.subscribe(value => {
            this.drawerSize = this.responsiveService.calculateDrawerWidth(value);
        })
    }

    public get formBuild() {
        return this.fb.group({
            category: [null, [Validators.required]],
            amount: [null, [Validators.required]],
            recordDate: [null, [Validators.required]],
            comment: [null, [Validators.required]],
            uploads: [null]
        });
    }

    public get isDrawer() {
        return this.popup.display == ModalOrDrawer.DRAWER;
    }

    public toggle = (value: boolean, type: ModalOrDrawer) => {
        if (type === ModalOrDrawer.DRAWER) {
            this.showDrawer = value;
        } else if (type === ModalOrDrawer.MODAL) {
            this.showModal = value;
        } else {
            this.showDrawer = value;
            this.showModal = value;
        }
    };

    public open = () => {
        if (this.isDrawer) {
            this.toggle(true, ModalOrDrawer.DRAWER);
        } else {
            this.toggle(true, ModalOrDrawer.MODAL);
        }
    };

    public onCreate = async () => {
        if (this.categoryForm.invalid) {
            this.util.markFormFieldsAsDirtyAndTouched(this.categoryForm);
            this.notification.warning('Validation error', 'Please check the fields, some are incorrect');
            return;
        }
        this.isLoading = true;
        const payload = this.categoryForm.value;

        const response = await this.util.handleUsecaseRequest(this.usecase.save(payload), this.notification);
        this.clearForm(response);
    };

    public status(name: string) {
        return this.util.getNzFormControlValidStatus(name, this.categoryForm);
    }

    public onDateSelected(date: string) {
        if (date) {
            this.categoryForm.get('recordDate')?.setValue(date);
        }
    }

    private clearForm(response: HttpResponse<ExpensesPayload>): void {
        this.isLoading = false;
        if (response && response.ok) {
            this.categoryForm.reset();
            this.categoryForm = this.formBuild;
            this.toggle(false, ModalOrDrawer.ANY);
        }
    }
}
