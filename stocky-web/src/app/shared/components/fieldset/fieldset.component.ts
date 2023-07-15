import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-fieldset',
    templateUrl: './fieldset.component.html',
    styles: [
        `
          legend {
            margin-bottom: 10px;
            margin-left: 5px;
            padding-left: 11px;
            border-bottom-color: transparent;
          }
        `
    ]
})
export class FieldsetComponent {
    @Input()
    public legend?: string;
}
