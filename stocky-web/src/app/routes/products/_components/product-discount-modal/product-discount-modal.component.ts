import {HttpResponse} from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {UtilService} from '../../../../shared/utils/util.service';
import {ProductDiscountPayload, ProductPayload} from '../../_data/product.payload';
import {ProductUsecase} from '../../_usecase/product.usecase';

@Component({
    selector: 'app-product-discount-modal',
    templateUrl: './product-discount-modal.component.html',
    styles: []
})
export class ProductDiscountModalComponent implements OnInit {

    @Input()
    public visibility = false;

    @Input()
    public product?: ProductPayload;

    public startDate = '';
    public endDate = '';
    public discount = 0;
    public isLoading = false;

    constructor(
        private productUsecase: ProductUsecase,
        private notification: NzNotificationService,
        private msg: NzMessageService,
        private util: UtilService
    ) {}

    public ngOnInit() {
        if (this.product) {
            this.discount = this.product?.price?.discount ?? 0;
        }
    }

    public emptyAction = () => {};

    public handleConfirmAction = async () => {
        this.isLoading = true;
        const payload: ProductDiscountPayload = {
            productId: Number(this.product?.id),
            discount: Number(this.discount),
            start: this.startDate,
            end: this.endDate
        };

        const res = await this.util.handleUsecaseRequest(this.productUsecase.updateDiscount(payload), this.notification);
        this.onAfterRequest(res);
    };

    public onInputChange(ev: any) {

        const value = ev.target.value;
        if (value < 1) {
            ev.preventDefault();
            this.discount = 1;
            ev.target.value = 1;
        }

    }

    private onAfterRequest(res: HttpResponse<boolean>) {
        this.isLoading = false;
        if (res && res.ok && res.body) {
            this.visibility = false;
        }
    }


}
