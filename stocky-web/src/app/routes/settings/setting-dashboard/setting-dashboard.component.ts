import { Component, OnInit } from '@angular/core';
import { Crumbs } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import {
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';

@Component({
    selector: 'app-setting-dashboard',
    templateUrl: './setting-dashboard.component.html',
})
export class SettingDashboardComponent implements OnInit {
    public crumbs: Crumbs[] = [
        { link: '/dashboard', title: 'Dashboard' },
        { title: 'Setting' },
        { link: '/settings/dashboard', title: 'Dashboard Setting ' },
    ];
    validateForm!: UntypedFormGroup;
    captchaTooltipIcon: NzFormTooltipIcon = {
        type: 'info-circle',
        theme: 'twotone',
    };

    constructor(private fb: UntypedFormBuilder) {}

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            email: [null, [Validators.email, Validators.required]],
            password: [null, [Validators.required]],
            checkPassword: [
                null,
                [Validators.required, this.confirmationValidator],
            ],
            nickname: [null, [Validators.required]],
            phoneNumberPrefix: ['+86'],
            phoneNumber: [null, [Validators.required]],
            website: [null, [Validators.required]],
            captcha: [null, [Validators.required]],
            agree: [false],
        });
    }

    submitForm(): void {
        if (this.validateForm.valid) {
            console.log('submit', this.validateForm.value);
        } else {
            Object.values(this.validateForm.controls).forEach((control) => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    updateConfirmValidator(): void {
        /** wait for refresh value */
        Promise.resolve().then(() =>
            this.validateForm.controls['checkPassword'].updateValueAndValidity()
        );
    }

    confirmationValidator = (
        control: UntypedFormControl
    ): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (
            control.value !== this.validateForm.controls['password'].value
        ) {
            return { confirm: true, error: true };
        }
        return {};
    };

    getCaptcha(e: MouseEvent): void {
        e.preventDefault();
    }
}
