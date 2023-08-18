import {HttpResponse} from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {UnitOfMeasureUsecase} from 'src/app/routes/products/_usecase/unit-of-measure.usecase';
import {UtilService} from '../../../../../shared/utils/util.service';

@Component({
    selector: 'app-unit-of-measurement-add',
    templateUrl: './unit-of-measurement-add.component.html',
    styles: []
})
export class UnitOfMeasurementAddComponent implements OnInit {

    @Input()
    public buttonText = 'Add New';

    @Input()
    public buttonIcon = 'edit';

    @Input()
    public showTable = false;

    public isSaving = false;
    public isVisible = false;
    public form!: UntypedFormGroup;

    constructor(
        private fb: UntypedFormBuilder,
        private usecase: UnitOfMeasureUsecase,
        private notification: NzNotificationService,
        private util: UtilService
    ) {}

    public showModal = () => (this.isVisible = true);

    public ngOnInit(): void {
        this.form = this.fb.group({
            title: [null, [Validators.required]],
            unit: [null, [Validators.required]]
        });
    }

    public async onCreate(): Promise<void> {
        const isInvalid = this.util.isFormInvalid(this.form);
        if (isInvalid) {
            this.notification.info('INVALID FIELDS', 'SOME FIELDS ARE INVALID, CHECK AND RETRY.');
            return;
        }
        this.isSaving = true;
        const formValue = this.form.value;
        let response = await this.util.handleUsecaseRequest(this.usecase.save(formValue), this.notification);
        this.onAfterCreate(response);
    }

    private onAfterCreate = (response: HttpResponse<any>) => {
        this.isSaving = false;
        if (response.ok) {
            this.form.reset();
            this.notifyChange();
        }
    };

    private notifyChange() {
        this.usecase.triggerChange(true);
    }
}
