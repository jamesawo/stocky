import {Component, Input} from '@angular/core';
import {ModalOrDrawer} from '../../../data/payload/common.enum';

@Component({
    selector: 'app-footer-button',
    templateUrl: './footer-button.component.html',
    styles: []
})
export class FooterButtonComponent {

    @Input()
    public isSaving: boolean = false;


    @Input()
    public props?: {
        cancelArgs?: any;
    };

    @Input()
    action: {
        submitAction?: (arg?: any) => void,
        cancelAction?: (arg?: any) => void
    } = {
        submitAction: () => {},
        cancelAction: () => {}
    };
    protected readonly ModalOrDrawer = ModalOrDrawer;
}
