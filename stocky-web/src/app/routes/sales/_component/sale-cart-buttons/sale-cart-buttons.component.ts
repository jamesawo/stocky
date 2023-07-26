import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
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
export class SaleCartButtonsComponent implements OnInit {

    @ViewChild('modalTmpl')
    public modalTemp?: TemplateRef<any>;

    public isLoadingPayment = false;
    public isSavingOrder = false;
    public cart?: SaleCart;


    constructor(
        private cartUsecase: SaleCartUsecase,
        private modalService: NzModalService,
        private settingUsecase: SettingUsecase
    ) {}


    public ngOnInit(): void {
        this.cartUsecase.cart$.subscribe(cart => this.cart = cart);
    }

    public handleShowModal = (arg?: any) => {

        const canProceed = this.canProceedToPayment();

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

    private async canProceedToPayment(): Promise<boolean> {
        const cart = this.cart;
        const enforceCustomer = await this.settingUsecase.getByKey(SettingConstant.SETTING_SALES_ENFORCE_CUSTOMER_ON_SALES_CHECKOUT, SettingModuleEnum.SALES);

        console.log(enforceCustomer);
        console.log(cart);
        return false;

    }


}
