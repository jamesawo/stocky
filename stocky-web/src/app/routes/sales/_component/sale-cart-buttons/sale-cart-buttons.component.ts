import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Subscription} from 'rxjs';
import {SettingConstant} from '../../../../data/constant/setting.constant';
import {SettingModuleEnum} from '../../../../data/payload/common.enum';
import {SettingUsecase} from '../../../settings/_usecase/setting.usecase';
import {SaleCart} from '../../_data/sale-cart.payload';
import {SaleCartUsecase} from '../../_usecase/sale-cart.usecase';

@Component({
    selector: 'app-sale-cart-buttons',
    templateUrl: './sale-cart-buttons.component.html',
    styleUrls: ['./sale-cart-buttons.component.css']
})
export class SaleCartButtonsComponent implements OnInit, OnDestroy {

    @ViewChild('modalTmpl')
    public modalTemp?: TemplateRef<any>;

    public isLoadingPayment = false;
    public isSavingOrder = false;
    public cart?: SaleCart;
    public isCustomerRequired?: boolean;
    public validationError = 'Validation Error!';

    private sub = new Subscription();


    constructor(
        private cartUsecase: SaleCartUsecase,
        private modalService: NzModalService,
        private settingUsecase: SettingUsecase,
        private notification: NzNotificationService
    ) {}


    public async ngOnInit(): Promise<void> {
        this.sub.add(
            this.cartUsecase.cart$.subscribe(cart => this.cart = cart)
        );

        this.isCustomerRequired = await this.settingUsecase.getByKeyAsBool(
            SettingConstant.SETTING_SALES_ENFORCE_CUSTOMER_ON_SALES_CHECKOUT,
            SettingModuleEnum.SALES, true);

    }

    public ngOnDestroy() {
        this.handleCleanUp();
    }


    public handleShowModal = (arg?: any) => {

        const canProceed = this.canProceedToPayment();
        if (!canProceed.status) {
            this.notification.error(this.validationError, canProceed.message, {nzPlacement: 'top'});
            return;
        }

        this.modalService.create({
            nzContent: this.modalTemp,
            nzFooter: null
        });
    };

    public handlePayButton = (arg?: any) => {
        console.log('making payment');
    };

    public handleClearButton = (arg?: any) => {
        this.cart?.emptyCart();
    };

    public handleSaveButton = (arg?: any) => {
    };

    private canProceedToPayment(): {message: string, status: boolean} {
        const cart = this.cart;

        if (!cart?.items || !cart?.items.length) {
            return {message: 'Cart is empty, please add some products', status: false};
        }

        if (this.isCustomerRequired && !cart?.customer?.id) {
            return {message: 'Customer is required, please search or create one', status: false};
        }

        return {message: '', status: true};

    }

    private handleCleanUp = async () => {
        this.sub.unsubscribe();
    };
}
