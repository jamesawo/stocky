import {HttpResponse} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {firstValueFrom, Subscription} from 'rxjs';
import {Message} from '../../../../data/constant/message.constant';
import {PermissionConstant} from '../../../../data/constant/permission.constant';
import {SettingConstant} from '../../../../data/constant/setting.constant';
import {SettingModuleEnum} from '../../../../data/payload/common.enum';
import {UtilService} from '../../../../shared/utils/util.service';
import {SettingUsecase} from '../../../settings/_usecase/setting.usecase';
import {SaleCart} from '../../_data/sale-cart.payload';
import {SaleTransaction} from '../../_data/sale-transaction.payload';
import {SaleCartUsecase} from '../../_usecase/sale-cart.usecase';
import {SaleTransactionReportUsecase} from '../../_usecase/sale-transaction-report.usecase';
import {SaleTransactionUsecase} from '../../_usecase/sale-transaction.usecase';

export type StatusResponseType = {message: string, status: boolean}

@Component({
    selector: 'app-sale-cart-buttons',
    templateUrl: './sale-cart-buttons.component.html',
    styleUrls: ['./sale-cart-buttons.component.css']
})
export class SaleCartButtonsComponent implements OnInit, OnDestroy {

    public cart?: SaleCart;
    public isCustomerRequired?: boolean;
    public arrayBuffer?: any;

    public readonly message = Message;
    protected readonly PermissionConstant = PermissionConstant;
    private sub = new Subscription();

    constructor(
        private cartUsecase: SaleCartUsecase,
        private modalService: NzModalService,
        private settingUsecase: SettingUsecase,
        private notification: NzNotificationService,
        private transactionUsecase: SaleTransactionUsecase,
        private receiptUsecase: SaleTransactionReportUsecase,
        private util: UtilService
    ) {}

    public emptyAction = () => {};

    public async ngOnInit(): Promise<void> {
        this.sub.add(
            this.cartUsecase.cart$.subscribe(cart => this.cart = cart)
        );

        this.isCustomerRequired = await this.settingUsecase.getByKeyAsBool(
            SettingConstant.SETTING_SALES_ENFORCE_CUSTOMER_ON_SALES_CHECKOUT,
            SettingModuleEnum.SALES, true);

    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public handleSaveTransaction = async (arg?: any) => {
        if (!this.cart) {
            this.notification.error(this.message.VALIDATION_ERROR, this.message.CART_IS_REQUIRED, {nzPlacement: 'top'});
            return;
        }

        const response = this.canProceedToPayment();
        if (!response.status) {
            this.notification.error(this.message.VALIDATION_ERROR, response.message, {nzPlacement: 'top'});
            return;
        }
        const transaction = this.cart!.toTransaction();
        const res = await this.util.handleUsecaseRequest(this.transactionUsecase.save(transaction), this.notification);
        await this.handlePreviewReceipt(res);
    };

    public handleClearButton = (arg?: any) => {
        this.cart?.emptyCart();
    };

    public handleSaveAsOrderButton = (arg?: any) => {
        //todo:: save cart items as order that can be processed later.
    };

    private async handlePreviewReceipt(res: HttpResponse<SaleTransaction>) {
        if (res.ok && res.body && res.body.receiptUrl) {
            const {reference, serial} = res.body;
            if (reference && serial) {
                const data = await firstValueFrom(this.receiptUsecase.searchTransactionReceipt(serial));
                this.receiptUsecase.handlePreviewReceipt(data);
                this.cart?.emptyCart();
            }
        }
    }

    private canProceedToPayment(): StatusResponseType {
        const cart = this.cart;

        if (!cart) {
            return {message: 'Cart is not present, kindly refresh and add products', status: false};
        }

        if (!cart?.items || !cart?.items.length) {
            return {message: 'Cart is empty, please add some products', status: false};
        }

        if (this.isCustomerRequired && !cart?.customer?.id) {
            return {message: 'Customer is required, please search or create one', status: false};
        }

        if (!this.hasPaymentOption()) {

            return {message: this.message.SELECT_PAYMENT_OPTION, status: false};
        }

        return {message: '', status: true};
    }

    private hasPaymentOption(): boolean {
        const hasOption = this.cart && this.cart.paymentOption && this.cart.paymentOption.id;
        return !!hasOption;
    }
}
