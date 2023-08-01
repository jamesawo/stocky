import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BehaviorSubject, catchError, debounceTime, map, Observable, of, Subscription, switchMap} from 'rxjs';
import {distinctUntilChanged, filter} from 'rxjs/operators';
import {SettingOption, SettingPayload} from '../../_data/setting.payload';
import {SettingUsecase} from '../../_usecase/setting.usecase';

@Component({
    selector: 'app-setting-field-radio',
    templateUrl: './setting-field-radio.component.html',
    styles: []
})
export class SettingFieldRadioComponent implements OnInit, OnDestroy {

    public options: SettingOption[] = [];

    public option?: string = '';

    @Input()
    public setting: SettingPayload = new SettingPayload();

    @Output()
    public settingChange = new EventEmitter();

    public isLoading = false;
    public searchSubject = new BehaviorSubject('');
    private sub = new Subscription();

    constructor(private settingUsecase: SettingUsecase) {}

    public onOptionChange(value: string): void {
        this.isLoading = true;
        this.searchSubject.next(value);
    }

    public handleUpdate = (searchTerm: string): Observable<boolean> => {
        const key = this.setting.settingKey;
        const module = this.setting.settingModule;
        const value = this.searchSubject.value;

        if (key && module && value) {
            const setting: SettingPayload = {settingModule: module, settingKey: key, settingValue: value};

            return this.settingUsecase.updateValue(setting)
                .pipe(
                    catchError(() => of(false)),
                    map((res: any) => res)
                );
        }
        return of();
    };

    public ngOnInit(): void {
        this.setOptions();
        this.sub.add(
            this.searchSubject
                .pipe(filter((res) => res !== null && res.length > 0), distinctUntilChanged())
                .pipe(debounceTime(1000)).pipe(switchMap(this.handleUpdate))
                .subscribe(response => this.onSettingUpdated(response))
        );

    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private onSettingUpdated = (updated?: any): void => {
        this.isLoading = false;
        if (updated) {
            this.setting.settingValue = this.searchSubject.value;
            this.settingChange.emit(this.setting);
        }
    };

    private setOptions() {
        if (this.setting && this.setting.settingOptions) {
            this.options = [...this.setting.settingOptions];
            const find = this.options.find(value => value.optionValue == this.setting.settingValue);
            this.option = find?.optionValue;
        }
    }

}
