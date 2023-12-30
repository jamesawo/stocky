import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {NzTableLayout, NzTableSize} from 'ng-zorro-antd/table';
import {Observable} from 'rxjs';

export type TableCol = {
    title: string;
    width?: number;
};

export type TableProps = {
    tableSize?: NzTableSize;
    showPagination?: boolean;
    isLoading?: boolean;
    tableLayout?: NzTableLayout
};

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styles: [
        `.table-container {
            width: 100%;
            overflow-x: auto; /* Add horizontal scrollbar when content exceeds width */
        }

        .nowrap-cell {
            white-space: nowrap;
        }

        th.no-wrap {
            white-space: nowrap;
        }

        `
    ]
})
export class TableComponent {
    @Input()
    public pageIndex = 0;

    @Output()
    public pageIndexChange = new EventEmitter<number>();

    @Input()
    public pageSize = 0;

    @Output()
    public pageSizeChange = new EventEmitter<number>();

    @Input()
    public dataList?: Observable<any[]>;

    @Input()
    public rowTemplates?: TemplateRef<any>[];

    @Input()
    public colHeadings?: TableCol[];

    @Input()
    public props?: TableProps = {tableSize: 'middle', tableLayout: 'fixed'};

    public onPageIndexChange(value: number) {
        this.pageIndexChange.emit(value);
    }

    public onPageSizeChange(value: number) {
        this.pageSizeChange.emit(value);
    }

    public onAllChecked(value: boolean) {
    }

    public onItemChecked(id?: number, value?: boolean) {
    }
}
