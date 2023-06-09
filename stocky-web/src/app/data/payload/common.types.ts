import {FormGroup} from '@angular/forms';
import {NzButtonSize} from 'ng-zorro-antd/button';

export type CommonInputProps = {
    size?: NzButtonSize,
    title?: string,
    icon?: string,
    showTable?: boolean,
    showForm?: boolean,
}

export type CommonAddProps = {
    showForm?: boolean,
    showTable?: boolean
}


export type FormProps = {
    formGroup: FormGroup,
    controlName: string
};


export type SearchProps = {
    hasError?: boolean;
    autoFocus?: boolean;
    required?: boolean;
    span?: number;
    showLabel?: boolean;
}

export type PopupViewProps = {
    display: 'drawer' | 'modal'
}


