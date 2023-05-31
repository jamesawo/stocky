import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-switch-toggle',
    templateUrl: './switch-toggle.component.html',
    styles: []
})
export class SwitchToggleComponent implements OnInit {

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
    }

    public onSwitchToggled(value: boolean) {
        this.valueChange.emit(value);
    }

    public onClear() {
        this.value = undefined;
    }
}
