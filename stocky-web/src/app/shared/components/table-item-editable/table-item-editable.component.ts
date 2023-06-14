import {Component, EventEmitter, Input, Output} from '@angular/core';

export type TableItemEditableProps = {
    fieldName: string;
    isEditMode?: boolean;
    initialValue: any;
};

export type TextTruncateProps = {
    canTruncateText: boolean;
    truncateAfter: number;
}

@Component({
    selector: 'app-table-item-editable',
    templateUrl: './table-item-editable.component.html',
    styles: []
})
export class TableItemEditableComponent<T> {
    @Input()
    public class?: string;

    @Input()
    public props?: TableItemEditableProps;


    @Input()
    public truncateProps?: TextTruncateProps;

    @Input()
    public value?: any;

    @Output()
    public valueChange = new EventEmitter<any>();

    public showModal = false;

    /**
     * Handles the input event and emits the updated value as the user is typing.
     * @param {Event} event - The input event object.
     * @returns {void}
     */
    public onInput(event: Event): void {
        const value: any = (event.target as HTMLInputElement).value;
        this.valueChange.emit(value);
    }

    public onCloseModal() {
        this.showModal = false;
    }
}
