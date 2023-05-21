import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-table-item-editable',
    templateUrl: './table-item-editable.component.html',
    styles: [],
})
export class TableItemEditableComponent<T> {
    @Input()
    public class?: string;

    @Input()
    public props?: {
        fieldName: string;
        isEditMode?: boolean;
        initialValue: any;
    };

    @Input()
    public value?: any;

    @Output()
    public valueChange = new EventEmitter<any>();

    /**
     * Handles the input event and emits the updated value as the user is typing.
     * @param {Event} event - The input event object.
     * @returns {void}
     */
    public onInput(event: Event): void {
        const value: any = (event.target as HTMLInputElement).value;
        this.valueChange.emit(value);
    }
}
