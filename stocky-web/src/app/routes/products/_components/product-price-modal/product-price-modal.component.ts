import {HttpResponse} from '@angular/common/http';
import {Component, Input} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {UtilService} from '../../../../shared/utils/util.service';
import {StockPrice} from '../../../stock/_data/stock.payload';
import {ProductPayload} from '../../_data/product.payload';
import {ProductUsecase} from '../../_usecase/product.usecase';

@Component({
    selector: 'app-product-price-modal',
    templateUrl: './product-price-modal.component.html',
    styles: []
})
export class ProductPriceModalComponent {

    @Input()
    public visibility: boolean = false;

    @Input()
    public product?: ProductPayload;

    public price = new StockPrice();
    public isLoading = false;
    public isEditingPrice = false;

    constructor(
        private productUsecase: ProductUsecase,
        private notification: NzNotificationService,
        private msg: NzMessageService,
        private util: UtilService
    ) {}

    public get priceModalTitle() {
        return `LATEST PRICE:  ${this.product?.basic.productName} (${this.product?.basic.brandName})`;
    };

    public onEditPrice = () => {
        this.setPrice();
        this.isEditingPrice = !this.isEditingPrice;
    };

    public emptyAction() {
    }

    public async handlePriceUpdate() {
        if (this.product && this.product.id) {
            this.isLoading = true;
            const res = await this.util.handleUsecaseRequest(
                this.productUsecase.updatePrice(this.product, this.price),
                this.notification
            );
            this.isLoading = false;
            this.onAfterPriceUpdate(res);
        }
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
            this.visibility = false;
        }
    }


}
