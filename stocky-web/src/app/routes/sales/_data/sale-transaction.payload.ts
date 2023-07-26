import {CustomerPayload, EmployeePayload} from '../../company/_data/company.payload';
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
    quantity: number = 0;
    grandTotal: number = 0;
    discount: number = 0;
    tax: number = 0;
    subTotal: number = 0;
}

export class SaleTransaction {
    id?: number;
    reference?: string;
    token?: string;
    time?: string;
    date?: string;
    customer?: CustomerPayload;
    employee?: EmployeePayload;
    amount?: SaleTransactionAmount;
    installment?: SaleTransactionInstallment;
    items?: SaleTransactionItem[] = [];
    other?: string;
    receiptUrl?: string;

    public toAmount = (cart: SaleCart) => {
        let transAmount = new SaleTransactionAmount();
        transAmount.discountTotal = cart.discountTotal;
        transAmount.grandTotal = cart.grandTotal;
        transAmount.subTotal = cart.subTotal;
        transAmount.taxTotal = cart.taxTotal;
        // this.amount = transAmount;
        return transAmount;
    };

    public toInstallment = () => {
        let tranInstallment = new SaleTransactionInstallment();
        tranInstallment.installmentType = SaleTransactionInstallmentType.FULL_PAYMENT;
        // this.installment = tranInstallment;
        return tranInstallment;
    };

    public toItems = (cart: SaleCart) => {
        return cart.items.map(cartItem => this.toTransactionItem(cartItem));
    };

    private toTransactionItem = (cartItem: SaleCartItem) => {
        let transItem = new SaleTransactionItem();
        transItem.product = cartItem.product;
        transItem.quantity = cartItem.quantity;
        transItem.grandTotal = cartItem.grandTotal;
        transItem.discount = cartItem.discount;
        transItem.tax = cartItem.tax;
        transItem.subTotal = cartItem.subTotal;
        return transItem;
    };

}
