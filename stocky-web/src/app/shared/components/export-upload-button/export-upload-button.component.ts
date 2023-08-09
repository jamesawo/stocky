import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FileType} from '../../../data/payload/common.enum';
import {BreakPoints, ResponsiveService} from '../../utils/responsive.service';

@Component({
    selector: 'app-export-upload-button',
    templateUrl: './export-upload-button.component.html',
    styles: []
})
export class ExportUploadButtonComponent implements OnInit, OnDestroy {

    public displayTest = true;
    public readonly fileType = FileType;

    @Input()
    public props: {} = {};

    @Input()
    public args?: any;

    @Input()
    public disableButtons: boolean = false;

    @Input()
    public disableImport: boolean = false;

    @Input()
    public disableExport: boolean = false;

    @Input()
    public toolTips: {import: string, export: string} = {import: '', export: ''};

    private sub = new Subscription();

    constructor(private service: ResponsiveService) {
    }

    @Input()
    public onDownload: (args?: any) => void = () => {};

    @Input()
    public onUpload: (args?: any) => void = () => {};

    public ngOnInit(): void {
        this.sub.add(
            this.service.mediaBreakpoint$.subscribe(
                value => this.onBreakPointChange(value)
            )
        );
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public onBreakPointChange(value: string) {
        this.displayTest = value !== BreakPoints.XS;
    }

}
