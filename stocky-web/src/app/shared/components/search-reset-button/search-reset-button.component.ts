import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {BreakPoints, ResponsiveService} from '../../utils/responsive.service';

@Component({
    selector: 'app-search-reset-button',
    templateUrl: './search-reset-button.component.html',
    styles: []
})
export class SearchResetButtonComponent implements OnInit, OnDestroy {
    public showTitle = true;

    @Input()
    public props: {
        onSearchAction: () => void;
        isLoadingSearchResult: boolean;
        onResetSearchPayload: () => void;
        onCancelAction: () => void;
        hideSearchBtn?: boolean;
    } = {
        onSearchAction: () => {},
        isLoadingSearchResult: false,
        onResetSearchPayload: () => {},
        onCancelAction: () => {}
    };

    private sub = new Subscription();

    constructor(private service: ResponsiveService) {}

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
}
