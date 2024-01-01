import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, tap} from 'rxjs/operators';
import {SaleProductsUsecase} from '../../_usecase/sale-products.usecase';

@Component({
    selector: 'app-sales-product-search',
    templateUrl: './sales-product-search.component.html',
    styles: []
})
export class SalesProductSearchComponent implements OnInit, OnDestroy {
    public isLoading = false;
    private searchInput$: Subject<string> = new Subject<string>();
    private subscription: Subscription = new Subscription();

    constructor(private saleProductUsecase: SaleProductsUsecase) {
    }

    public onInput(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.searchInput$.next(value);
    }

    ngOnInit(): void {
        this.saleProductUsecase.searching$.subscribe(value => this.isLoading = value);
        this.listOnSearchInput();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private listOnSearchInput() {
        this.subscription.add(
            this.searchInput$
                .pipe(
                    filter((res) => res !== null && res.length >= 3),
                    distinctUntilChanged(),
                    tap(() => this.saleProductUsecase.setSearching(true))
                )
                .subscribe((value) => this.saleProductUsecase.search(value).subscribe())
        );
    }

}
