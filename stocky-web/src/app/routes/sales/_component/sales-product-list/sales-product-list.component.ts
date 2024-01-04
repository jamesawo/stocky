import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Subscription} from 'rxjs';
import {PageResultPayload} from '../../../../data/payload/common.interface';
import {PagePayload} from '../../../../data/payload/common.payload';
import {UtilService} from '../../../../shared/utils/util.service';
import {ProductPayload} from '../../../products/_data/product.payload';
import {SaleCartNotifyType} from '../../_data/sale-cart.enum';
import {SaleCart} from '../../_data/sale-cart.payload';
import {SaleCartUsecase} from '../../_usecase/sale-cart.usecase';
import {SaleProductsUsecase} from '../../_usecase/sale-products.usecase';

@Component({
    selector: 'app-sales-product-list',
    templateUrl: './sales-product-list.component.html',
    styleUrls: ['./sales-product-list.component.css']
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
        private msg: NzMessageService,
        private util: UtilService
    ) {
    }

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
        console.log(product)
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
        return this.util.getProductFullName(product);
    }

    private updateProductList(response: PageResultPayload<ProductPayload> | null) {
        if (response) {
            this.page = response.page;
            this.products = response.result;
        }
    }

    private notify(isAdded: boolean, product: ProductPayload) {
        if (isAdded) {
            this.msg.info(this.util.getProductName(product) + ' Added to cart!');
        } else {
            this.msg.error(this.util.getProductName(product) + ' Already in cart!');
        }
    }

    private onNotifyChange(type: SaleCartNotifyType) {
        if (type && type === SaleCartNotifyType.CLEAR_PRODUCT_RESULT) {
            this.saleCartUsecase.setNotifyType(SaleCartNotifyType.NONE);
            this.products = [];
        }
    }
}
