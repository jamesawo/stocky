import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-setting-locker',
    templateUrl: './setting-locker.component.html',
    styles: []
})
export class SettingLockerComponent {

    @Input()
    public disabled: boolean = false;

    @Input()
    public toolTip: string = 'This feature is currently not available';

}
