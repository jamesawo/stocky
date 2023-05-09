import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-expand-collapse-button',
    templateUrl: './expand-collapse-button.component.html',
    styles: [],
})
export class ExpandCollapseButtonComponent implements OnInit {

    @Input()
    public open: boolean = false;

    @Output()
    public openChange = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }

    public onToggle() {
        this.open = !this.open
        this.openChange.emit(this.open);
    }

}
