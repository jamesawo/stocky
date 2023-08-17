import {HttpResponse} from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {UtilService} from '../../../../shared/utils/util.service';
import {ProductPayload} from '../../_data/product.payload';
import {ProductUsecase} from '../../_usecase/product.usecase';

@Component({
    selector: 'app-product-quantity-modal',
    templateUrl: './product-quantity-modal.component.html',
    styles: []
})
export class ProductQuantityModalComponent implements OnInit {

    @Input()
    public visibility = false;

    @Input()
    public product?: ProductPayload;

    public productQuantity = 0;
    public isLoading = false;

    constructor(
        private notification: NzNotificationService,
        private productUsecase: ProductUsecase,
        private util: UtilService
    ) {}

    public get quantityModalTitle() {
        return `QUANTITY:  ${this.product?.basic.productName} ( ${this.productQuantity} )`;
    };

    public ngOnInit() {
        if (this.product) {
            this.productQuantity = this.product.basic?.quantity ?? 0;
        }
    }

    public emptyAction() {}

    public handleQuantityUpdate = async () => {
        if (this.product && this.product.id && this.productQuantity) {
            this.isLoading = true;
            const res = await this.util.handleUsecaseRequest(
                this.productUsecase.updateQuantity(this.product, this.productQuantity),
                this.notification
            );
            this.isLoading = false;
            this.onAfterPriceUpdate(res);
        }
    };

    public inputChange(ev: any) {

        const value = ev.target.value;
        if (value < 1) {
            ev.preventDefault();
            this.productQuantity = 1;
            ev.target.value = 1;
        }

    }

    private onAfterPriceUpdate(res: HttpResponse<ProductPayload>) {
        if (res.ok && res.body) {
            this.product = res.body;
            this.visibility = false;
        }
    }
}
