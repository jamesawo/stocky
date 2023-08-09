import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {BreakPoints, ResponsiveService} from '../../utils/responsive.service';

@Component({
    selector: 'app-export-upload-button',
    templateUrl: './export-upload-button.component.html',
    styles: []
})
export class ExportUploadButtonComponent implements OnInit, OnDestroy {

    public displayTest = true;

    @Input()
    public props: {} = {};

    @Input()
    public disableButtons: boolean = false;

    @Input()
    public disableImport: boolean = false;

    @Input()
    public disableExport: boolean = false;

    @Input()
    public toolTips: {
        import: string,
        export: string
    } = {import: '', export: ''};

    private sub = new Subscription();

    constructor(private service: ResponsiveService) {
    }

    ngOnInit(): void {
        this.sub.add(
            this.service.mediaBreakpoint$.subscribe(
                value => this.onBreakPointChange(value)
            )
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public onBreakPointChange(value: string) {
        this.displayTest = value !== BreakPoints.XS;
    }

}
