import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-table-item',
    templateUrl: './table-item.component.html',
    styles: []
})
export class TableItemComponent {

    @Input()
    content?: string;

    @Input()
    public props: {useProjection: boolean} = {useProjection: false};

}
