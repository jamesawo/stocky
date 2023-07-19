import {HttpClient} from '@angular/common/http';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {environment} from '@env/environment';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, tap} from 'rxjs/operators';
import {FormProps, SearchProps} from '../../../../data/payload/common.types';
import {ProductSearchResultPayload} from '../../_data/product.payload';

//deprecated
@Component({
    selector: 'app-product-search',
    templateUrl: './product-search.component.html',
    styles: []
})
export class ProductSearchComponent implements OnInit, OnDestroy {
    public options: ProductSearchResultPayload[] = [];
    public searchInput$ = new Subject<string>();
    public isLoading = false;
    public minLengthTerm = 2;
    @Input()
    form?: FormProps;
    @Input()
    public selected?: ProductSearchResultPayload;
    @Output()
    public selectedChange: EventEmitter<ProductSearchResultPayload> = new EventEmitter<ProductSearchResultPayload>();
    @Output()
    public value: EventEmitter<string> = new EventEmitter<string>();
    @Input()
    public props?: SearchProps;
    private url: string = environment.api.baseUrl + '/product';
    private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private subscription: Subscription = new Subscription();

    constructor(private http: HttpClient) {}

    public ngOnInit(): void {
        if (this.selected) {
            if (this.selected.id) {
                this.options.push(this.selected);
            } else {
                this.selected = undefined;
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

    public onSelected(value: ProductSearchResultPayload) {
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
            this.http.get<ProductSearchResultPayload[]>(url).subscribe((value) => {
                this.options = value;
                this.loading.next(false);
            })
        );
    }


}
