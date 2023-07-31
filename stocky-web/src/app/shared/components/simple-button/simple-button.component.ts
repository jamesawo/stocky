import {Component, Input} from '@angular/core';
import {NzButtonSize, NzButtonType} from 'ng-zorro-antd/button';

@Component({
    selector: 'app-simple-button',
    templateUrl: './simple-button.component.html',
    styles: []
})
export class SimpleButtonComponent {

    @Input()
    public disabled = false;

    @Input()
    public usePopConfirm = false;

    @Input()
    public args?: any = {};

    @Input()
    public icon = '';

    @Input()
    public iconClass = '';

    @Input()
    public popCancelText = 'No, Cancel';

    @Input()
    public popOkText = 'Yes, Continue';

    @Input()
    public popConfirmTitle = 'Are you sure?';

    @Input()
    public popConfirmPlacement = 'top';

    @Input()
    public buttonText: string = '';

    @Input()
    public buttonType: NzButtonType = 'default';

    @Input()
    public buttonSize: NzButtonSize = 'large';

    @Input()
    public buttonClass = '';

    @Input()
    public action: (arg?: any) => void = () => {};

    @Input()
    public cancelAction = (args?: any) => {};

}
