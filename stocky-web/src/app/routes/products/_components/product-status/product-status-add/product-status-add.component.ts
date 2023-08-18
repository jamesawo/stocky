import {HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {UtilService} from '../../../../../shared/utils/util.service';
import {ProductStatusUsecase} from '../../../_usecase/product-status.usecase';

@Component({
    selector: 'app-product-status-add',
    templateUrl: './product-status-add.component.html',
    styles: []
})
export class ProductStatusAddComponent implements OnInit {
    public isVisible = false;
    public form!: UntypedFormGroup;
    public isSaving = false;

    constructor(
        private fb: UntypedFormBuilder,
        private usecase: ProductStatusUsecase,
        private notification: NzNotificationService,
        private util: UtilService
    ) {}

    public showModal = () => (this.isVisible = true);

    public ngOnInit(): void {
        this.form = this.fb.group({
            title: [null, [Validators.required]],
            description: [null]
        });
    }

    public async onCreate(): Promise<void> {
        const isInvalid = this.util.isFormInvalid(this.form);
        if (isInvalid) {
            this.notification.error('INVALID FIELDS', 'SOME FIELDS ARE INVALID, CHECK AND RETRY.');
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

    private notifyChange = () => {
        this.usecase.triggerChange(true);
    };
}
