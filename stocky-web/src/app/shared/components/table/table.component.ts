import {Component, Input, TemplateRef} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styles: []
})
export class TableComponent {
    @Input()
    public dataList?: Observable<any[]>;

    @Input()
    public rowTemplates?: TemplateRef<any>[];

    @Input()
    public colHeadings?: string[];


}
