import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {NzSizeDSType} from 'ng-zorro-antd/core/types';

@Component({
    selector: 'app-password-input',
    templateUrl: './password-input.component.html',
    styles: []
})
export class PasswordInputComponent implements OnInit {

    @Input()
    public value = '';

    @Output()
    public valueChange = new EventEmitter<string>();

    @Input()
    public form: FormGroup = new FormGroup<any>({});

    @Input()
    public props?: {size?: NzSizeDSType, formControlName?: string, icon?: string};

    public hiddenToggle: boolean = true;
    public displayIcon = 'eye-invisible';
    public passwordType = 'password';

    constructor() {
    }

    public get hasFormControl(): boolean {
        const controls = this.form.controls;
        return Object.keys(controls).length > 0;
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

    public onValueChange(event: any) {
        const text = event.target.value;
        this.valueChange.emit(text);
    }

}
