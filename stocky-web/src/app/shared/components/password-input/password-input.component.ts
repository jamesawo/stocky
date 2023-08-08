import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {NzSizeDSType} from 'ng-zorro-antd/core/types';

@Component({
    selector: 'app-password-input',
    templateUrl: './password-input.component.html',
    styles: []
})
export class PasswordInputComponent implements OnInit {

    @Input()
    public form: FormGroup = new FormGroup<any>({});

    @Input()
    public props?: {size?: NzSizeDSType, formControlName?: string, icon?: string};

    public hiddenToggle: boolean = true;
    public displayIcon = 'eye-invisible';
    public passwordType = 'password';

    constructor() {
    }

    ngOnInit(): void {
    }

    public onToggleIcon() {
        this.hiddenToggle = !this.hiddenToggle;

        if (this.hiddenToggle) {
            this.displayIcon = 'eye-invisible';
            this.passwordType = 'password';
        } else {
            this.displayIcon = 'eye';
            this.passwordType = 'text';
        }
    }

    public getPlaceHolder(): string {
        return 'Enter ' + this.props?.formControlName ?? 'password';
    }

    public getErrorTip() {
        return 'Please provide ' + this.props?.formControlName ?? 'password';
    }


}
