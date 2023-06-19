import {HttpClient} from '@angular/common/http';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {environment} from '@env/environment';
import {NzSelectModeType} from 'ng-zorro-antd/select/select.types';
import {BehaviorSubject, catchError, debounceTime, map, Observable, of, switchMap} from 'rxjs';
import {PRODUCT_ROUTES} from '../../../../data/constant/routes.constant';
import {FormProps} from '../../../../data/payload/common.types';

@Component({
    selector: 'app-product-category-search-dropdown',
    templateUrl: './product-category-search-dropdown.component.html',
    styles: []
})
export class ProductCategorySearchDropdownComponent {

    public defaultValues: any;

    @Input()
    public formProps?: FormProps;

    @Input()
    public props: {placeholder: string, mode: NzSelectModeType} = {placeholder: 'Search category', mode: 'multiple'};
    @Input()
    public label: string = 'title';
    @Input()
    public searchUrl = PRODUCT_ROUTES.PRODUCT_CATEGORY_SEARCH;
    public searchChange$ = new BehaviorSubject('');
    @Input()
    public value: any;
    @Output()
    public valueChange = new EventEmitter();
    public isLoading = false;
    private baseUrl = environment.api.baseUrl;

    constructor(private http: HttpClient) {}

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
        this.searchChange$.next(value);
    }

    public ngOnInit(): void {
        this.setDefaultValues();

        const getDataFromBackend = (searchTerm: string): Observable<any> => {
            return this.http
                .get(`${this.baseUrl}/${this.url}${searchTerm}`)
                .pipe(
                    catchError(() => of([])),
                    map((res: any) => res)
                );
        };


        const optionList$: Observable<any> = this.searchChange$.asObservable()
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
