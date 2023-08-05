import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-coming-soon-text',
    templateUrl: './coming-soon-text.component.html',
    styles: [
        `
          .icon-position {
            bottom: 10px;
            position: absolute;
            right: -15px
          }
        `
    ]
})
export class ComingSoonTextComponent {
    @Input()
    public text = '';

    @Input()
    public showIcon = true;
}
