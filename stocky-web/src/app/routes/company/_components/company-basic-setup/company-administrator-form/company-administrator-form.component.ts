import {HttpResponse} from '@angular/common/http';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {handleUsecaseRequest, markFormFieldsAsDirtyAndTouched} from '../../../../../shared/utils/util';
import {CompanyAdministratorDetailsPayload, CompanyBasicDetailsPayload} from '../../../_data/company-setup.payload';
import {AdministratorProfileSetupUsecase} from '../../../_usecase/company-setup/administrator-profile-setup.usecase';

@Component({
    selector: 'app-company-administrator-form',
    templateUrl: './company-administrator-form.component.html',
    styles: []
})
export class CompanyAdministratorFormComponent {

    public isLoading = false;
    public form: FormGroup = this.formBuild;

    constructor(
        private fb: FormBuilder,
        private usecase: AdministratorProfileSetupUsecase,
        private notification: NzNotificationService
    ) {
    }

    public get formBuild() {
        return this.fb.group({
            profileName: [null, [Validators.required]],
            phoneNumber: [null, [Validators.required]],
            profileEmail: [null, [Validators.required]],
            profilePosition: [null, []]
        });
    }

    public async onSave(): Promise<void> {
        if (this.form.invalid) {
            markFormFieldsAsDirtyAndTouched(this.form);
            return;
        }
        this.isLoading = true;
        const form = <CompanyAdministratorDetailsPayload>this.form.value;
        const response = await handleUsecaseRequest(this.usecase.save(form), this.notification);
        this.onResetForm(response);
    }

    private onResetForm(response: HttpResponse<CompanyBasicDetailsPayload>): void {
        this.isLoading = false;
        if (response.ok) {
            this.form.reset();
            this.form = this.formBuild;
        }
    }
}
