import {Component, OnInit} from '@angular/core';
import {FormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {checkFormControlCharacterLimit, handleUsecaseRequest, isFormInvalid} from '../../../../shared/utils/util';
import {LocationUsecase} from '../../_usecase/location.usecase';

@Component({
    selector: 'app-company-location-form',
    templateUrl: './company-location-form.component.html',
    styles: []
})
export class CompanyLocationFormComponent implements OnInit {

    public form!: FormGroup;
    public isSaving = false;

    constructor(
        private fb: UntypedFormBuilder,
        private usecase: LocationUsecase,
        private notification: NzNotificationService
    ) {}

    public ngOnInit() {
        this.initForm();
    }

    public async onCreate(): Promise<void> {
        const isInvalid = isFormInvalid(this.form);
        if (isInvalid) {
            return;
        }
        const option = this.form.value;
        await handleUsecaseRequest(this.usecase.save(option), this.notification);
        this.onResetPayload();
    }

    public checkCharacterLimit(value: any) {
        const formControl = this.form.get('description');
        checkFormControlCharacterLimit(formControl!);
    }

    private initForm() {
        this.form = this.fb.group({
            title: [null, [Validators.required]],
            description: [],
            type: [null, Validators.required],
            status: [true]
        });
    }

    private onResetPayload() {
        this.initForm();
        this.isSaving = false;
        this.usecase.setTrigger(true);
    }


}
