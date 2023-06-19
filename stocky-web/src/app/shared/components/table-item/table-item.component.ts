import {Component, Input, TemplateRef} from '@angular/core';

@Component({
    selector: 'app-table-item',
    templateUrl: './table-item.component.html',
    styles: []
})
export class TableItemComponent {
    
    @Input()
    public content?: string | TemplateRef<any>;


    public get isTemplateRef() {
        return this.content instanceof TemplateRef;
    }

    public get contentRef(): TemplateRef<any> {
        return <TemplateRef<any>>this.content;
    }

}
