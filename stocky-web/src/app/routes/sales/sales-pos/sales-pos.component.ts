import {Component, OnInit} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {Observable, of, Subject} from 'rxjs';
import {CanComponentDeactivate} from '../../../data/payload/common.interface';
import {SaleCart} from '../_data/sale-cart.payload';
import {SaleCartUsecase} from '../_usecase/sale-cart.usecase';

@Component({
    selector: 'app-sales-pos',
    templateUrl: './sales-pos.component.html',
    styles: []
})
export class SalesPosComponent implements CanComponentDeactivate, OnInit {

    public cart?: SaleCart;

    constructor(
        private cartUsecase: SaleCartUsecase,
        private modalService: NzModalService
    ) {
    }

    ngOnInit() {
        this.cartUsecase.cart$.subscribe(cart => this.cart = cart);
    }

    canDeactivate(): Observable<boolean> {
        let canDeactivate = new Subject<boolean>();

        /*
        todo:: temporary disabled; rethink then reimplement
        if (this.cart && this.cart?.items?.length > 0) {

            this.modalService.confirm(
                {
                    nzTitle: 'Are you sure you want to leave?',
                    nzContent: '<b style="color: #ff0000ff;">Items in the cart will be cleared</b>',
                    nzOnOk: instance => {
                        this.cart?.emptyCart();
                        canDeactivate.next(true);
                    },
                    nzCancelText: 'No, Go Back!',
                    nzOkText: 'Yes, Leave!',
                    nzOkType: 'primary',
                    nzOkDanger: true
                },
                'warning'
            );

        } else {

            return of(true);
        }
        return canDeactivate.asObservable();
        */
        return of(true);

    }


}
