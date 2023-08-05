import {DateRangeParam} from '../../../data/param/common.param';
import {CommonPayload} from '../../../data/payload/common.payload';
import {CustomerPayload, EmployeePayload, EmployeeUserAccountPayload} from '../../company/_data/company.payload';
import {ProductPayload} from '../../products/_data/product.payload';
import {SaleCartItem} from './sale-cart-item.payload';
import {SaleTransactionInstallmentType} from './sale-cart.enum';
import {SaleCart} from './sale-cart.payload';

export class SaleTransactionAmount {
    id?: number;
    grandTotal: number = 0;
    discountTotal: number = 0;
    taxTotal: number = 0;
    subTotal: number = 0;

}

export class SaleTransactionInstallment {
    id?: number;
    installmentType?: SaleTransactionInstallmentType;

}

export class SaleTransactionItem {
    id?: number;
    product?: ProductPayload;
    price: number = 0;
    quantity: number = 0;
    grandTotal: number = 0;
    discount: number = 0;
    tax: number = 0;
    subTotal: number = 0;
}

export class SaleTransaction {
    id?: number;
    reference?: string;
    serial?: string;
    time?: string;
    date?: string;
    customer?: CustomerPayload;
    employee?: EmployeePayload;
    amount?: SaleTransactionAmount;
    installment?: SaleTransactionInstallment;
    items?: SaleTransactionItem[] = [];
    other?: string;
    receiptUrl?: string;
    paymentOption?: CommonPayload;

    public getAmountFromCart = (cart: SaleCart) => {
        let transAmount = new SaleTransactionAmount();
        transAmount.discountTotal = cart.discountTotal;
        transAmount.grandTotal = cart.grandTotal;
        transAmount.subTotal = cart.subTotal;
        transAmount.taxTotal = cart.taxTotal;
        return transAmount;
    };

    public getFullPaymentInstallment = () => {
        let tranInstallment = new SaleTransactionInstallment();
        tranInstallment.installmentType = SaleTransactionInstallmentType.FULL_PAYMENT;
        return tranInstallment;
    };

    public getItemsFromCartItems = (cart: SaleCart) => {
        return cart.items.map(cartItem => this.fromCartItem(cartItem));
    };

    private fromCartItem = (cartItem: SaleCartItem) => {
        let transItem = new SaleTransactionItem();
        transItem.product = cartItem.product;
        transItem.quantity = cartItem.quantity;
        transItem.grandTotal = cartItem.grandTotal;
        transItem.discount = cartItem.discount;
        transItem.tax = cartItem.tax;
        transItem.subTotal = cartItem.subTotal;
        transItem.price = cartItem.price;
        return transItem;
    };

}

export class SaleTransactionSearchRequest {
    id?: number;
    reference?: string;
    serial?: string;
    time?: string;
    date?: string;
    customer?: CustomerPayload;
    user?: EmployeeUserAccountPayload;
    installment?: SaleTransactionInstallment;
    dateRange?: DateRangeParam;
}
