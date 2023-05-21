import {Component, Input, TemplateRef} from '@angular/core';
import {NzTableSize} from 'ng-zorro-antd/table';
import {Observable} from 'rxjs';

export type TableCol = {
    title: string;
    width?: number;
};

export type TableProps = {
    tableSize?: NzTableSize;
    showPagination?: boolean;
};

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styles: [],
})
export class TableComponent {
    @Input()
    public dataList?: Observable<any[]>;

    @Input()
    public rowTemplates?: TemplateRef<any>[];

    @Input()
    public colHeadings?: TableCol[];

    @Input()
    public props?: TableProps = {tableSize: 'middle'};
}
