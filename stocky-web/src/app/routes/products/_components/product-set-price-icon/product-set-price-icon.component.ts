import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {ProductPayload} from '../../_data/product.payload';
import {ProductUsecase} from '../../_usecase/product.usecase';

enum ModalType {
    PRICE,
    QUANTITY,
    DISCOUNT,
    OFF
}

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
    public isDiscountModalVisible = false;

    protected readonly ModalType = ModalType;


    constructor(
        private notification: NzNotificationService,
        private modal: NzModalService,
        private productUsecase: ProductUsecase
    ) {}


    public toggleModalVisibility(type: ModalType) {
        if (type == ModalType.PRICE) {
            this.isPriceModalVisible = !this.isPriceModalVisible;
        } else if (type == ModalType.QUANTITY) {
            this.isQtyModalVisible = !this.isQtyModalVisible;
        } else if (type == ModalType.DISCOUNT) {
            this.isDiscountModalVisible = !this.isDiscountModalVisible;
        } else {
            this.isPriceModalVisible = false;
            this.isQtyModalVisible = false;
        }
    }


}
