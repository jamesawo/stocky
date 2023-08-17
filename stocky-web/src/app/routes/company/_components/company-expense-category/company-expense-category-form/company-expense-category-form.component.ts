import {Component, OnInit} from '@angular/core';
import {FormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {UtilService} from 'src/app/shared/utils/util.service';
import {ExpenseCategoryUsecase} from '../../../_usecase/company-expenses/expense-category.usecase';

@Component({
    selector: 'app-company-expense-category-form',
    templateUrl: './company-expense-category-form.component.html',
    styles: []
})
export class CompanyExpenseCategoryFormComponent implements OnInit {

    public form!: FormGroup;
    public isSaving = false;

    constructor(
        private fb: UntypedFormBuilder,
        private usecase: ExpenseCategoryUsecase,
        private notification: NzNotificationService,
        private util: UtilService
    ) {}

    public ngOnInit() {
        this.initForm();
    }

    public async onCreate(): Promise<void> {
        const isInvalid = this.util.isFormInvalid(this.form);
        if (isInvalid) {
            return;
        }
        const option = this.form.value;
        await this.util.handleUsecaseRequest(this.usecase.save(option), this.notification);
        this.onResetPayload();
    }

    public checkCharacterLimit(value: any) {
        const formControl = this.form.get('description');
        this.util.checkFormControlCharacterLimit(formControl!);
    }

    private initForm() {
        this.form = this.fb.group({
            title: [null, [Validators.required]],
            description: []
        });
    }

    private onResetPayload() {
        this.initForm();
        this.isSaving = false;
        this.usecase.setTrigger(true);
    }

}
