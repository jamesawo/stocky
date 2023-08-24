import {Component, Input, TemplateRef} from '@angular/core';

export type NzType = 'success' | 'info' | 'warning' | 'error';

@Component({
    selector: 'app-page-alert',
    templateUrl: './page-alert.component.html',
    styles: []
})
export class PageAlertComponent {

    @Input()
    public showAlert?: boolean = false;

    @Input()
    public message: string | TemplateRef<void> | null | undefined;

    @Input()
    public type: NzType = 'info';

    @Input()
    public closeable?: boolean = true;

    public showNotification(content: string | TemplateRef<any> | undefined) {
        this.message = content;
        this.showAlert = true;
        setTimeout(() => {
            this.showAlert = false;
        }, 10000);
    }

}
