import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-status-badge',
    templateUrl: './status-badge.component.html',
    styles: [],
})
export class StatusBadgeComponent implements OnInit {
    @Input()
    public status?: boolean = false;

    @Input()
    public props?: {style?: number};

    constructor() {
    }

    ngOnInit(): void {
    }

}
