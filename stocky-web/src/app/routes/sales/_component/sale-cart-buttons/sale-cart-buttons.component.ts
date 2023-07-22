import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {Observable} from 'rxjs';
import {CommonPayload} from '../../../../data/payload/common.payload';
import {PaymentOptionUsecase} from '../../../company/_usecase/payment-option.usecase';
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
    public paymentOptions$?: Observable<CommonPayload[]>;
    public paymentOption?: CommonPayload;

    constructor(
        private cartUsecase: SaleCartUsecase,
        private modalService: NzModalService,
        private paymentUsecase: PaymentOptionUsecase
    ) {}


    public ngOnInit(): void {
        this.cartUsecase.cart$.subscribe(cart => this.cart = cart);
        this.paymentOptions$ = this.paymentUsecase.getAll();
    }

    public handlePayButton = (arg?: any) => {
        this.modalService.create({
            nzContent: this.modalTemp,
            nzFooter: null
        });
    };

    public handleClearButton = (arg?: any) => {
        this.cart?.emptyCart();
    };

    public handleSaveButton = (arg?: any) => {

    };

    public emptyAction() {

    }

    public isSelected(option: CommonPayload) {
        return this.paymentOption?.id === option.id;
    }
}
