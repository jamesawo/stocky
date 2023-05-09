import { Component, Input } from '@angular/core';

export interface Crumbs {
    title: string;
    link?: string;
}

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styles: [],
})
export class BreadcrumbsComponent {
    @Input()
    public crumbs: Crumbs[] = [];
}
