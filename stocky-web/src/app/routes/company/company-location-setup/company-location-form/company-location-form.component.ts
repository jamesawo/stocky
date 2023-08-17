import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {UtilService} from '../../../../shared/utils/util.service';
import {LocationTypeEnum} from '../../_data/company.enum';
import {LocationPayload, LocationTypePayload} from '../../_data/company.payload';
import {LocationUsecase} from '../../_usecase/location.usecase';


const locationTypes: LocationTypePayload[] = [
    {id: 1, title: 'BRANCH', type: LocationTypeEnum.BRANCH},
    {id: 2, title: 'WAREHOUSE', type: LocationTypeEnum.WARE_HOUSE},
    {id: 3, title: 'STORE FRONT', type: LocationTypeEnum.STORE_FRONT}
];

@Component({
    selector: 'app-company-location-form',
    templateUrl: './company-location-form.component.html',
    styles: []
})
export class CompanyLocationFormComponent implements OnInit {
    @Input()
    public location?: LocationPayload;
    public form!: FormGroup;
    public isSaving = false;
    public types = locationTypes;
    protected readonly getNzFormControlValidStatus = this.util.getNzFormControlValidStatus;

    constructor(
        private fb: FormBuilder,
        private usecase: LocationUsecase,
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

    public transform(type: string) {
        return type.replaceAll('_', ' ');
    }

    private initForm() {
        this.form = this.fb.group({
            title: [this.location?.title ?? null, [Validators.required]],
            description: [this.location?.description ?? null],
            type: [this.location?.type ?? null, Validators.required]
        });
    }

    private onResetPayload() {
        this.initForm();
        this.isSaving = false;
        this.usecase.setTrigger(true);
    }
}
