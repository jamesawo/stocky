import {Component, Input, TemplateRef} from '@angular/core';

@Component({
    selector: 'app-table-item-truncatable',
    templateUrl: './table-item-truncatable.component.html',
    styles: []
})
export class TableItemTruncatableComponent {

    @Input()
    public class = '';

    @Input()
    public color: string = '#108ee9';

    @Input()
    public content?: string | TemplateRef<any>;

    @Input()
    public limit: number = 10;

    @Input()
    public showToolTip = true;

    public get slicedContent() {
        const content = <string>this.content;
        if (this.limit < content.length) {
            return content.slice(0, this.limit) + '...';
        }
        return content;

    };

    public get isTemplateRef() {
        return this.content instanceof TemplateRef;
    }

    public get contentRef(): TemplateRef<any> {

        return <TemplateRef<any>>this.content;
    }

}
