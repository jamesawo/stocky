import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UtilService} from '../../utils/util.service';

export type TextAreaLimitProps = {
    showLabel?: boolean;
    labelText?: string;
    formGroup?: FormGroup
    fromControlName?: string
}

@Component({
    selector: 'app-textarea-limit',
    templateUrl: './textarea-limit.component.html',
    styles: []
})
export class TextareaLimitComponent implements AfterViewInit {

    @ViewChild('textAreaElement', {static: true})
    public textArea?: ElementRef<HTMLTextAreaElement>;


    @Input()
    public limit: number = 50;

    @Input()
    public props?: TextAreaLimitProps;

    @Input()
    public value: string = '';

    @Output()
    public valueChange = new EventEmitter<string>();
    @ViewChildren('textAreaElement') textareaElements?: QueryList<ElementRef<HTMLTextAreaElement>>;
    protected readonly getNzFormControlValidStatus = this.util.getNzFormControlValidStatus;

    constructor(private util: UtilService) {}

    public checkCharacterLimit(value: any) {
        if (this.props && this.props.formGroup && this.props.fromControlName) {
            const controlName = this.props.fromControlName;
            const formControl = this.props.formGroup.get(controlName);
            this.util.checkFormControlCharacterLimit(formControl!, this.limit);
        }
    }

    public onValueChange(value: string) {
        if (this.textArea) {
            let textareaValue = this.textArea.nativeElement.value;

            const trim = textareaValue.length >= this.limit ? textareaValue.slice(0, this.limit) : textareaValue;
            this.textArea.nativeElement.value = trim;
            this.valueChange.emit(trim);
        }
    }

    ngAfterViewInit() {
        this.updateTextareaValue();
    }

    private updateTextareaValue() {
        if (this.textareaElements) {
            this.textareaElements.forEach(textareaElement => {
                if (textareaElement) {
                    this.textArea = textareaElement;
                }
            });
        }
    }
}
