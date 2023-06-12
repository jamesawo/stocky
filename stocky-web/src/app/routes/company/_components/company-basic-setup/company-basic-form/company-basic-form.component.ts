import {HttpResponse} from '@angular/common/http';
import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {handleUsecaseRequest, markFormFieldsAsDirtyAndTouched} from 'src/app/shared/utils/util';
import {CompanyBasicDetailsPayload} from '../../../_data/company-setup.payload';
import {BasicSetupUsecase} from '../../../_usecase/basic-setup.usecase';

@Component({
    selector: 'app-company-basic-form',
    templateUrl: './company-basic-form.component.html',
    styles: []
})
export class CompanyBasicFormComponent {

    public basicDetailForm = this.basicForm;
    public loading = false;


    constructor(
        private fb: FormBuilder,
        private usecase: BasicSetupUsecase,
        private notification: NzNotificationService
    ) {}

    get basicForm() {

        return this.fb.group({
            businessName: [null, [Validators.required]],
            businessCategory: [null, [Validators.required]],
            businessEmployeeSize: [null, [Validators.required]],
            businessNumberOfYearsOfOperation: [null, [Validators.required]],
            businessNumberOfBranch: [null, [Validators.required]],
            businessAddress: [null, [Validators.required]]
            // businessAddress: this.fb.group({
            //     country: [null],
            //     state: [null],
            //     lga: [null],
            //     city: [null],
            //     street: [null],
            //     postal: [null]
            // })
        });

    }

    public async onSaveBasicDetails() {

        if (this.basicDetailForm.invalid) {
            markFormFieldsAsDirtyAndTouched(this.basicDetailForm);
            return;
        }

        this.loading = true;
        const form = <CompanyBasicDetailsPayload>this.basicForm.value;
        const response = await handleUsecaseRequest(this.usecase.saveBasicDetails(form), this.notification);
        this.onResetForm(response);

    }

    private onResetForm(response: HttpResponse<CompanyBasicDetailsPayload>): void {
        this.loading = false;
        if (response.ok) {
            this.basicDetailForm.reset();
            this.basicDetailForm = this.basicForm;
        }
    }

}
