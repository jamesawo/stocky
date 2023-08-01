import {HttpClient} from '@angular/common/http';
import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {environment} from '@env/environment';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzSelectModeType} from 'ng-zorro-antd/select/select.types';
import {BehaviorSubject, catchError, debounceTime, map, Observable, of, switchMap} from 'rxjs';
import {distinctUntilChanged, filter} from 'rxjs/operators';
import {FormProps} from '../../../data/payload/common.types';

@Component({
    selector: 'app-search-model-dropdown',
    templateUrl: './search-model-dropdown.component.html',
    styles: []
})
export class SearchModelDropdownComponent {
    /* The internal variable to track selected option/options */
    public defaultValues: any;

    /* The nz-select should show a loading icon and loading... text when user is searching */
    public isLoading = false;

    /* The text to search with from the nz-select input element entered by the user */
    public searchSubject = new BehaviorSubject('');

    /* If to use formGroup and formControlName to pass data back to caller */
    @Input()
    public formProps?: FormProps;

    /* Component properties for customizing the nz-select component in the view  */
    @Input()
    public props: {placeholder: string, mode: NzSelectModeType} = {placeholder: 'Search ..', mode: 'multiple'};

    /* The ng-option label property */
    @Input()
    public option: string = '';

    /* The ng-option custom template */
    @Input()
    public optionTemplate: TemplateRef<any> | null = null;

    /* The url to send get request and retrieve searched data */
    @Input()
    public searchUrl = '';

    /* The selected option/options depends on select mode */
    @Input()
    public value: any;

    /* An event emitter that emits the option/options that has been selected */
    @Output()
    public valueChange = new EventEmitter();

    /* The minimum character users will type before it should make get request to searchUrl */
    @Input()
    public minLength = 4;

    /* Base url prefix from environment variable, used to concat the search endpoint */
    private baseUrl = environment.api.baseUrl;

    constructor(
        private http: HttpClient,
        private msg: NzMessageService
    ) {}


    private get url() {
        let urlEndpoint = this.searchUrl;
        if (urlEndpoint[0] == '/') {
            urlEndpoint = urlEndpoint.substring(1, urlEndpoint.length);
        }
        return urlEndpoint;
    }

    private get hasFormGroupAndFormControl() {
        return this.formProps && this.formProps.formGroup && this.formProps.controlName;
    }

    public onSearch(value: string): void {
        this.isLoading = true;
        this.searchSubject.next(value);
    }

    public ngOnInit(): void {
        this.setDefaultValues();
        const getDataFromBackend = (searchTerm: string): Observable<any> => {
            if (this.searchUrl.length > 0) {
                return this.http
                    .get(`${this.baseUrl}/${this.url}${searchTerm}`)
                    .pipe(
                        catchError(() => of([])),
                        map((res: any) => res)
                    );
            }
            this.msg.error('search parameter error');
            return of();
        };
        const optionList$ = this.searchSubject
            .pipe(
                filter((res) => res !== null && res.length >= this.minLength),
                distinctUntilChanged())
            .pipe(debounceTime(500)).pipe(switchMap(getDataFromBackend));
        optionList$.subscribe(data => {
            this.value = data;
            this.isLoading = false;
        });
    }

    public onValueChange(values: any) {
        this.valueChange.emit(values);
        this.setFormControlValue(values);
    }

    public clear() {
        this.value = undefined;
        this.defaultValues = undefined;
    }

    public getPropertyValue(item: any, path: string): any {
        const properties = path.split('.');
        let value = item;
        for (const prop of properties) {
            if (value.hasOwnProperty(prop)) {
                value = value[prop];
            } else {
                value = null;
                break;
            }
        }

        return value;
    }

    private setFormControlValue(values: any) {
        if (this.hasFormGroupAndFormControl) {
            const {formGroup, controlName} = this.formProps!;
            formGroup.controls[controlName].setValue(values);
        }
    }

    private setDefaultValues() {
        if (this.hasFormGroupAndFormControl) {
            const {formGroup, controlName} = this.formProps!;
            this.defaultValues = formGroup.controls[controlName].value;
        } else {
            this.defaultValues = this.value;
        }
    }

}
