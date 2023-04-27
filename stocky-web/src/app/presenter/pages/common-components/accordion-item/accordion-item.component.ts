import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-accordion-item',
    templateUrl: './accordion-item.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class AccordionItemComponent implements OnInit {
    @Input()
    public title?: string;
    public open = false;

    public headingId?: string;
    public accordionId?: string;

    ngOnInit(): void {
        this.headingId = `accordion-heading-${this.uid()}`;
        this.accordionId = `accordion-body-${this.uid()}`;
    }

    protected uid = () => Math.random().toString(36).substring(2);
}
