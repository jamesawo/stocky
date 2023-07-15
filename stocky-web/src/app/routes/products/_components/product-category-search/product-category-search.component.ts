import {HttpClient} from '@angular/common/http';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {environment} from '@env/environment';
import {NzSelectModeType} from 'ng-zorro-antd/select/select.types';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, tap} from 'rxjs/operators';
import {FormProps, SearchProps} from '../../../../data/payload/common.types';
import {ProductCategoryPayload} from '../../_data/product.payload';

@Component({
    selector: 'app-product-category-search',
    templateUrl: './product-category-search.component.html',
    styles: []
})
export class ProductCategorySearchComponent implements OnInit, OnDestroy {
    @Input()
    public mode: NzSelectModeType = 'default';
    public options: ProductCategoryPayload[] = [];
    public searchInput$ = new Subject<string>();
    public isLoading = false;
    public minLengthTerm = 2;
    @Input()
    form?: FormProps;
    @Input() // use this to pass in a default value. when the component renders, this value will be selected in the dropdown
    public selected?: ProductCategoryPayload;
    @Output() // use this to get the selected value when the user click on the dropdown option
    public selectedChange: EventEmitter<ProductCategoryPayload> = new EventEmitter<ProductCategoryPayload>();
    @Output() // use this to get the search text as the user is typing
    public value: EventEmitter<string> = new EventEmitter<string>();
    @Input()
    public props?: SearchProps;
    private url: string = environment.api.baseUrl + '/product/category';
    private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private subscription: Subscription = new Subscription();

    constructor(private http: HttpClient) {}

    public ngOnInit(): void {
        this.setDefault();
        this.onInitialize();
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public onInput(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.value.emit(value);
        this.searchInput$.next(value);
    }

    public onSelected(value: ProductCategoryPayload) {
        if (value) {
            this.selected = value;
            this.selectedChange.emit(value);
        }
    }

    public onClear() {
        this.selected = undefined;
        this.options = [];
    }

    public canUseFormGroup() {
        if (this.form) {
            return !!this.form.formGroup && !!this.form.controlName;
        }
        return false;
    }

    private setDefault() {
        const formProps = this.form;
        if (formProps && formProps.controlName) {
            this.selected = formProps.formGroup.controls[formProps.controlName].value;
        }

        if (this.selected && this.selected.id) {
            this.options.push(this.selected);
        } else {
            this.selected = undefined;
        }

    }

    private onInitialize() {
        this.subscription.add(this.loading.asObservable().subscribe((value) => (this.isLoading = value)));

        this.subscription.add(
            this.searchInput$
                .pipe(
                    filter((res) => res !== null && res.length >= this.minLengthTerm),
                    distinctUntilChanged(),
                    tap(() => this.loading.next(true))
                )
                .subscribe((value) => this.onPrepareSearch(value))
        );
    }

    private onPrepareSearch(value: string) {
        let extraUrlParams = ``;
        const url = `${this.url}/search?term=${value}`;
        this.onSearchData(url);
    }

    private onSearchData(url: string): void {
        this.subscription.add(
            this.http.get<ProductCategoryPayload[]>(url).subscribe((value) => {
                this.options = value;
                this.loading.next(false);
            })
        );
    }
}
