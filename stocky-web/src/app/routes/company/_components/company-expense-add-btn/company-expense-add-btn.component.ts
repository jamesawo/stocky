import {HttpResponse} from '@angular/common/http';
import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {ModalOrDrawer} from '../../../../data/payload/common.enum';
import {CommonAddProps, PopupViewProps} from '../../../../data/payload/common.types';
import {
    getNzFormControlValidStatus,
    handleUsecaseRequest,
    isFormControlInvalid,
    markFormFieldsAsDirtyAndTouched
} from '../../../../shared/utils/util';
import {ExpensesPayload} from '../../_data/company.payload';
import {ExpensesUsecase} from '../../_usecase/company-expenses/expenses.usecase';

@Component({
    selector: 'app-company-expense-add-btn',
    templateUrl: './company-expense-add-btn.component.html',
    styles: []
})
export class CompanyExpenseAddBtnComponent {
    public showDrawer = false;
    public isLoading = false;
    public showModal = false;
    public categoryForm: FormGroup = this.formBuild;

    @Input()
    public props: CommonAddProps = {};

    @Input()
    public popup: PopupViewProps = {display: ModalOrDrawer.DRAWER};

    protected readonly isFormControlInvalid = isFormControlInvalid;
    protected readonly ModalOrDrawer = ModalOrDrawer;

    constructor(
        private fb: FormBuilder,
        private usecase: ExpensesUsecase,
        private notification: NzNotificationService
    ) {}

    public get formBuild() {
        return this.fb.group({
            category: [null, [Validators.required]],
            amount: [null, [Validators.required]],
            recordDate: [null, [Validators.required]],
            comment: [null, [Validators.required]]
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
            markFormFieldsAsDirtyAndTouched(this.categoryForm);
            this.notification.warning('Validation error', 'Please check the fields, some are incorrect');
            return;
        }
        const payload = this.categoryForm.value;
        const response = await handleUsecaseRequest(this.usecase.save(payload), this.notification);
        this.clearForm(response);
    };

    public status(name: string) {
        return getNzFormControlValidStatus(name, this.categoryForm);
    }

    private clearForm(response: HttpResponse<ExpensesPayload>): void {
        if (response && response.ok) {
            this.categoryForm.reset();
            this.categoryForm = this.formBuild;
            this.toggle(false, ModalOrDrawer.ANY);
        }
    }
}
