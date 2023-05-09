import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

export enum BreakPoints {
    'XS' = 'xs',
    'SM' = 'sm',
    'MD' = 'md',
    'LG' = 'lg',
    'XL' = 'xl',
    'XXL' = 'xxl',
}

@Injectable({ providedIn: 'root' })
export class ResponsiveService implements OnDestroy {
    private _unsubscriber$: Subject<any> = new Subject();
    public screenWidth$: BehaviorSubject<number> = new BehaviorSubject(0);
    public mediaBreakpoint$: BehaviorSubject<string> = new BehaviorSubject('');

    constructor() {
        this.init();
    }

    init() {
        this._setScreenWidth(window.innerWidth);
        this._setMediaBreakpoint(window.innerWidth);
        fromEvent(window, 'resize').pipe(
            debounceTime(500),
            takeUntil(this._unsubscriber$),
        ).subscribe((evt: any) => {
            this._setScreenWidth(evt.target.innerWidth);
            this._setMediaBreakpoint(evt.target.innerWidth);
        });
    }

    ngOnDestroy() {
        this._unsubscriber$.next('');
        this._unsubscriber$.complete();
    }

    private _setScreenWidth(width: number): void {
        this.screenWidth$.next(width);
    }

    private _setMediaBreakpoint(width: number): void {
        if (width < 576) {
            this.mediaBreakpoint$.next(BreakPoints.XS);
        } else if (width >= 576 && width < 768) {
            this.mediaBreakpoint$.next(BreakPoints.SM);
        } else if (width >= 768 && width < 992) {
            this.mediaBreakpoint$.next(BreakPoints.MD);
        } else if (width >= 992 && width < 1200) {
            this.mediaBreakpoint$.next(BreakPoints.LG);
        } else if (width >= 1200 && width < 1600) {
            this.mediaBreakpoint$.next(BreakPoints.XL);
        } else {
            this.mediaBreakpoint$.next(BreakPoints.XXL);
        }
    }

}