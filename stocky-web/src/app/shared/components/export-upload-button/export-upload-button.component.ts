import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakPoints, ResponsiveService } from '../../utils/responsive.service';

@Component({
    selector: 'app-export-upload-button',
    templateUrl: './export-upload-button.component.html',
    styles: [],
})
export class ExportUploadButtonComponent implements OnInit, OnDestroy {

    public displayTest = true;

    @Input()
    public props: {} = {};

    private sub = new Subscription();

    constructor(private service: ResponsiveService) {
    }

    ngOnInit(): void {
        this.service.mediaBreakpoint$.subscribe(value => this.onBreakPointChange(value));
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public onBreakPointChange(value: string) {
        this.displayTest = value !== BreakPoints.XS;
    }

}
