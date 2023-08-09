import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NzButtonSize} from 'ng-zorro-antd/button';
import {Subscription} from 'rxjs';
import {SearchResetButtonProps} from '../../../data/payload/common.types';
import {BreakPoints, ResponsiveService} from '../../utils/responsive.service';

@Component({
    selector: 'app-search-reset-button',
    templateUrl: './search-reset-button.component.html',
    styles: []
})
export class SearchResetButtonComponent implements OnInit, OnDestroy {
    public showTitle = true;

    @Input()
    public disableButtons: boolean = false;

    @Input()
    public disableSearch: boolean = false;

    @Input()
    public disableReset: boolean = false;

    @Input()
    public toolTips: {
        search: string,
        reset: string
    } = {search: '', reset: ''};

    @Input()
    public size: NzButtonSize = 'large';

    @Input()
    public props: SearchResetButtonProps = this.defaultProps;
    private sub = new Subscription();

    constructor(private service: ResponsiveService) {}

    private get defaultProps() {
        return {
            onSearchAction: this.emptyAction,
            isLoadingSearchResult: false,
            onResetSearchPayload: this.emptyAction,
            onCancelAction: this.emptyAction
        };
    }

    ngOnInit(): void {
        this.service.mediaBreakpoint$.subscribe((value) =>
            this.onBreakPointChange(value)
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public onBreakPointChange(value: string) {
        setTimeout(() => {
            this.showTitle = value !== BreakPoints.XS;
        }, 10);
    }

    public emptyAction = () => {
    };
}
