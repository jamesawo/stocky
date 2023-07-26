import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormProps} from '../../../data/payload/common.types';

@Component({
    selector: 'app-switch-toggle',
    templateUrl: './switch-toggle.component.html',
    styles: []
})
export class SwitchToggleComponent implements OnInit {

    @Input()
    public formProps?: FormProps;

    @Input()
    hasError: boolean = false;

    @Input()
    public props: {showLabel: boolean, trueText: string, falseText: string} =
        {showLabel: false, trueText: 'ACTIVE', falseText: 'INACTIVE'};


    @Input()
    public value?: boolean = false;

    @Output()
    public valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit(): void {
        this.setValueIfFormProps();
    }

    public onSwitchToggled(value: boolean) {
        this.setFormControlValueOnChange(value);
        this.valueChange.emit(value);
    }

    public onClear() {
        this.value = undefined;
    }

    private setValueIfFormProps() {
        const formProps = this.formProps;

        if (formProps && formProps.formGroup && formProps.controlName) {
            const controlValue = formProps.formGroup.controls[formProps.controlName].value;
            if (typeof controlValue == 'string') {
                this.value = controlValue === 'true';
            } else if (typeof controlValue == 'boolean') {
                this.value = controlValue;
            }
        }
    }

    private setFormControlValueOnChange(value: boolean) {
        const formProps = this.formProps;
        if (formProps && formProps.formGroup && formProps.controlName) {
            formProps.formGroup.controls[formProps.controlName].setValue(value);
        }
    }
}
