import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NzButtonSize, NzButtonType} from 'ng-zorro-antd/button';
import {Subscription} from 'rxjs';
import {BreakPoints, ResponsiveService} from '../../utils/responsive.service';

export type ButtonProps = {
    handler: (arg?: any) => void;
    title?: string;
    isLoading?: boolean;
    type?: NzButtonType;
    size?: NzButtonSize;
    icon?: string;
    args?: any
    iconCss?: string;
};

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html'
})
export class ButtonComponent implements OnDestroy, OnInit {
    public showTitle = true;

    @Input()
    public disabled = false;

    @Input()
    public toolTip = '';

    @Input()
    public props: ButtonProps = {
        handler: () => {},
        title: 'Add',
        isLoading: false,
        type: 'primary',
        size: 'large',
        icon: ''
    };

    @Input()
    public btnClass: string = '';

    private sub = new Subscription();

    constructor(private service: ResponsiveService) {}

    ngOnInit(): void {
        if (!this.props.handler) this.props['handler'] = () => {};
        if (!this.props.isLoading) this.props['isLoading'] = false;
        if (!this.props.size) this.props['size'] = 'large';
        if (!this.props.type) this.props['type'] = 'primary';

        this.service.mediaBreakpoint$.subscribe((value) =>
            this.onBreakPointChange(value)
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public onBreakPointChange(value: string) {
        this.showTitle = value !== BreakPoints.XS;
    }
}
