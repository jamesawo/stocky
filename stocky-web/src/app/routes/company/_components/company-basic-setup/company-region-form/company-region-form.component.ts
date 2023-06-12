import {HttpResponse} from '@angular/common/http';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {handleUsecaseRequest, markFormFieldsAsDirtyAndTouched} from '../../../../../shared/utils/util';
import {CompanyLocaleDetailsPayload} from '../../../_data/company-setup.payload';
import {RegionLocaleUsecase} from '../../../_usecase/company-setup/region-locale.usecase';

@Component({
    selector: 'app-company-region-form',
    templateUrl: './company-region-form.component.html',
    styles: []
})
export class CompanyRegionFormComponent {
    public isLoading = false;
    public form: FormGroup = this.formBuild;

    constructor(
        private fb: FormBuilder,
        private usecase: RegionLocaleUsecase,
        private notification: NzNotificationService
    ) {}

    public get formBuild() {
        return this.fb.group({
            regionLanguage: ['en', [Validators.required]],
            regionCurrency: ['$', [Validators.required]],
            regionTimeZone: ['UTC', [Validators.required]]
        });
    }

    public async onSave(): Promise<void> {

        if (this.form.invalid) {
            markFormFieldsAsDirtyAndTouched(this.form);
            return;
        }

        this.isLoading = true;
        const form = <CompanyLocaleDetailsPayload>this.form.value;
        const response = await handleUsecaseRequest(this.usecase.save(form), this.notification);
        this.onResetForm(response);

    }

    private onResetForm(response: HttpResponse<CompanyLocaleDetailsPayload>): void {
        this.isLoading = false;
        this.form.reset();
        this.form = this.formBuild;
    }
}
