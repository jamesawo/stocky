import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
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
        private modalService: NzModalService
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

    private canProceedToPayment(): boolean {
        const cart = this.cart;
        console.log(cart);
        return false;

    }


}
