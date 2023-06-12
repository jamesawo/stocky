import {HttpResponse} from '@angular/common/http';
import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {handleUsecaseRequest, markFormFieldsAsDirtyAndTouched} from 'src/app/shared/utils/util';
import {CompanyBasicDetailsPayload} from '../../../_data/company-setup.payload';
import {BasicSetupUsecase} from '../../../_usecase/company-setup/basic-setup.usecase';

@Component({
    selector: 'app-company-basic-form',
    templateUrl: './company-basic-form.component.html',
    styles: []
})
export class CompanyBasicFormComponent {

    public form = this.buildForm;
    public isLoading = false;
    
    constructor(
        private fb: FormBuilder,
        private usecase: BasicSetupUsecase,
        private notification: NzNotificationService
    ) {}

    get buildForm() {
        return this.fb.group({
            businessName: [null, [Validators.required]],
            businessCategory: [null, [Validators.required]],
            businessEmployeeSize: [null, [Validators.required]],
            businessNumberOfYearsOfOperation: [null, [Validators.required]],
            businessNumberOfBranch: [null, [Validators.required]],
            businessAddress: [null, [Validators.required]]

            //todo:: make businessAddress an object of its own
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

        if (this.form.invalid) {
            markFormFieldsAsDirtyAndTouched(this.form);
            return;
        }

        this.isLoading = true;
        const form = <CompanyBasicDetailsPayload>this.buildForm.value;
        const response = await handleUsecaseRequest(this.usecase.save(form), this.notification);
        this.onResetForm(response);

    }

    private onResetForm(response: HttpResponse<CompanyBasicDetailsPayload>): void {
        this.isLoading = false;
        if (response.ok) {
            this.form.reset();
            this.form = this.buildForm;
        }
    }

}
