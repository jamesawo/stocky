import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-nothing-found',
    templateUrl: './nothing-found.component.html',
    styles: []
})
export class NothingFoundComponent {
    @Input()
    text = 'oops, nothing found!';
}
