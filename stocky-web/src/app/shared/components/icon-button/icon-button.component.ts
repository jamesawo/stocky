import {Component, Input} from '@angular/core';
import {NzButtonSize, NzButtonType} from 'ng-zorro-antd/button';

@Component({
    selector: 'app-icon-button',
    templateUrl: './icon-button.component.html',
    styles: []
})
export class IconButtonComponent {
    @Input()
    public args?: any;

    @Input()
    public icon: string = '';

    @Input()
    public css: string = '';

    @Input()
    public loading = false;

    @Input()
    public size: NzButtonSize = 'small';

    @Input()
    public type: NzButtonType = 'text';

    @Input()
    public tooltipTitle = '';
    
    @Input()
    public text: string = '';

    @Input()
    public action: (args?: any) => void = (args?: any) => {};

}
