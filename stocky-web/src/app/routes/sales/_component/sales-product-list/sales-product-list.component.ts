import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Subscription} from 'rxjs';
import {PageResultPayload} from '../../../../data/payload/common.interface';
import {PagePayload} from '../../../../data/payload/common.payload';
import {getProductFullName, getProductName} from '../../../../shared/utils/util';
import {ProductPayload} from '../../../products/_data/product.payload';
import {SaleCartNotifyType} from '../../_data/sale-cart.enum';
import {SaleCart} from '../../_data/sale-cart.payload';
import {SaleCartUsecase} from '../../_usecase/sale-cart.usecase';
import {SaleProductsUsecase} from '../../_usecase/sale-products.usecase';

@Component({
    selector: 'app-sales-product-list',
    templateUrl: './sales-product-list.component.html',
    styles: []
})
export class SalesProductListComponent implements OnInit, OnDestroy {
    @Input()
    public products?: Array<ProductPayload> = [];
    
    public cart?: SaleCart;

    @Input()
    public page?: PagePayload = new PagePayload();

    private sub = new Subscription();

    constructor(
        private saleProductUsecase: SaleProductsUsecase,
        private saleCartUsecase: SaleCartUsecase,
        private msg: NzMessageService
    ) {}

    public ngOnInit(): void {
        this.sub.add(
            this.saleCartUsecase.cart$.subscribe(cart => this.cart = cart)
        );
        this.sub.add(
            this.saleProductUsecase.searchResult$.subscribe(value => this.updateProductList(value))
        );
        this.sub.add(
            this.saleCartUsecase.notifyType$.subscribe(val => this.onNotifyChange(val))
        );
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public onAddProductToCart(product: ProductPayload) {
        if (this.cart) {
            const isAddedToCart = this.cart.addItem(product);
            this.notify(isAddedToCart, product);
        }
    }

    public isLowQuantity(product: ProductPayload): boolean {
        const basic = product?.basic;
        if (basic && basic?.quantity) {
            return basic?.quantity <= basic?.lowStockPoint;
        }
        return true;
    }

    public concatProductName(product: ProductPayload) {
        return getProductFullName(product);
    }

    private updateProductList(response: PageResultPayload<ProductPayload> | null) {
        if (response) {
            this.page = response.page;
            this.products = response.result;
        }
    }

    private notify(isAdded: boolean, product: ProductPayload) {
        if (isAdded) {
            this.msg.info(getProductName(product) + ' Added to cart!');
        } else {
            this.msg.error(getProductName(product) + ' Already in cart!');
        }
    }

    private onNotifyChange(type: SaleCartNotifyType) {
        if (type && type == SaleCartNotifyType.CLEAR_PRODUCT_RESULT) {
            this.products = [];
        }
    }

}
