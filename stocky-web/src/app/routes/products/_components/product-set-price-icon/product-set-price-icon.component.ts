import {HttpResponse} from '@angular/common/http';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {handleUsecaseRequest} from '../../../../shared/utils/util';
import {StockPrice} from '../../../stock/_data/stock.payload';
import {ProductPayload} from '../../_data/product.payload';
import {ProductUsecase} from '../../_usecase/product.usecase';

@Component({
    selector: 'app-product-set-price-icon',
    templateUrl: './product-set-price-icon.component.html',
    styles: []
})
export class ProductSetPriceIconComponent {

    @Input()
    public product?: ProductPayload;

    @Output()
    public productChange = new EventEmitter<ProductPayload>();

    public isPriceModalVisible = false;
    public isQtyModalVisible = false;
    public isEditingPrice = false;
    public price = new StockPrice();
    public productQuantity = 0;
    public isLoading = false;

    constructor(
        private notification: NzNotificationService,
        private modal: NzModalService,
        private productUsecase: ProductUsecase
    ) {}

    public get priceModalTitle() {
        return `LATEST PRICE:  ${this.product?.basic.productName} (${this.product?.basic.brandName})`;
    };

    public get quantityModalTitle() {
        return `QUANTITY:  ${this.product?.basic.productName} ( ${this.productQuantity} )`;
    };

    public onEditPrice = () => {
        this.setPrice();
        this.isEditingPrice = !this.isEditingPrice;
    };

    public toggleModalIsVisible(type: 'price' | 'quantity' | 'off') {
        if (type == 'price') {
            this.isPriceModalVisible = !this.isPriceModalVisible;
        } else if (type == 'quantity') {
            this.productQuantity = this.product?.basic.quantity ?? 0;
            this.isQtyModalVisible = !this.isQtyModalVisible;
        } else {
            this.isPriceModalVisible = false;
            this.isQtyModalVisible = false;
        }
    }

    public async handlePriceUpdate() {
        if (this.product && this.product.id) {
            this.isLoading = true;
            const res = await handleUsecaseRequest(
                this.productUsecase.updatePrice(this.product, this.price),
                this.notification
            );
            this.isLoading = false;
            this.onAfterPriceUpdate(res);
        }
    }

    public handleQuantityUpdate = async () => {
        if (this.product && this.product.id && this.productQuantity) {
            this.isLoading = true;
            const res = await handleUsecaseRequest(
                this.productUsecase.updateQuantity(this.product, this.productQuantity),
                this.notification
            );
            this.isLoading = false;
            this.onAfterPriceUpdate(res);
        }
    };

    public emptyAction() {
    }

    private setPrice(): void {
        if (this.product && this.product.price) {
            const productPriceTab = this.product.price;
            this.price.sellingPrice = productPriceTab.sellingPrice;
            this.price.costPrice = productPriceTab.costPrice;
            this.price.markupPercent = productPriceTab.markup;
        }
    }

    private onAfterPriceUpdate(res: HttpResponse<ProductPayload>) {
        if (res.ok && res.body) {
            this.product = res.body;
            this.productChange.emit(res.body);
            this.toggleModalIsVisible('off');
        }
    }
}
