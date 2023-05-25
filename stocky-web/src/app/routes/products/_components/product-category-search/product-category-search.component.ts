import {HttpClient} from '@angular/common/http';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {environment} from '@env/environment';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, tap} from 'rxjs/operators';
import {ProductCategoryPayload} from '../../_data/product.payload';
import {FormProps} from '../../_data/product.types';

@Component({
    selector: 'app-product-category-search',
    templateUrl: './product-category-search.component.html',
    styles: [],
})
export class ProductCategorySearchComponent implements OnInit, OnDestroy {
    public options: ProductCategoryPayload[] = [];
    private url: string = environment.api.baseUrl + '/product-category';
    private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private subscription: Subscription = new Subscription();
    public searchInput$ = new Subject<string>();
    public isLoading = false;
    public minLengthTerm = 2;

    @Input()
    form?: FormProps;

    @Input() // use this to pass in a default value. when the component renders, this value will be selected in the dropdown
    public selectedPayload?: ProductCategoryPayload;

    @Output() // use this to get the selected value when the user click on the dropdown option
    public selected: EventEmitter<ProductCategoryPayload> = new EventEmitter<ProductCategoryPayload>();

    @Output() // use this to get the search text as the user is typing
    public value: EventEmitter<string> = new EventEmitter<string>();

    @Input()
    public props?: {hasError?: boolean; autoFocus?: boolean; required?: boolean; span?: number};


    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        if (this.selectedPayload) {
            if (this.selectedPayload.id) {
                this.options.push(this.selectedPayload);
            } else {
                this.selectedPayload = undefined;
            }
        }
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
            this.selectedPayload = value;
            this.selected.emit(value);
        }
    }

    public onClear() {
        this.selectedPayload = undefined;
        this.options = [];
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

    public canUseFormGroup() {
        if (this.form){
            return !!this.form.formGroup && !!this.form.controlName;
        }
        return false;
    }
}
