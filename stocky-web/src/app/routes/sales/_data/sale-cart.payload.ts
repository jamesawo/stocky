import {CommonPayload} from '../../../data/payload/common.payload';
import {CustomerPayload} from '../../company/_data/company.payload';
import {ProductPayload} from '../../products/_data/product.payload';
import {SaleCartItem} from './sale-cart-item.payload';
import {SaleTransaction} from './sale-transaction.payload';

export class SaleCart {
    customer: CustomerPayload = new CustomerPayload();
    items: SaleCartItem[] = [];
    date: string = '';
    discountTotal: number = 0;
    taxTotal: number = 0;
    subTotal: number = 0;
    grandTotal: number = 0;
    paymentOption?: CommonPayload;

    public isProductExist = (product: ProductPayload): boolean => {
        const item = this.items.find(value => value.product.id === product.id);
        return !!item;
    };

    public addItem = (product: ProductPayload): boolean => {
        const exist = this.isProductExist(product);
        if (!exist) {
            this.items.push(new SaleCartItem(product));
            this.updateAmount();
        }
        return !exist;
    };

    public removeItem = (product: ProductPayload) => {
        const result = this.items.filter(value => value.product.id !== product.id);
        this.items = [...result];
        this.updateAmount();
    };

    public updateAmount = () => {
        this.updateDiscount();
        this.updateTax();
        this.updateSubTotal();
        this.updateTotal();
    };

    public updateDiscount = (): void => {
        this.discountTotal = this.items.reduce((accumulator, currentValue) => accumulator + Number(currentValue.discount), 0);
    };

    public updateTax = (): void => {
        this.taxTotal = this.items.reduce((accumulator, currentValue) => accumulator + Number(currentValue.tax), 0);
    };

    public updateSubTotal = (): void => {
        this.subTotal = this.items.reduce((accumulator, currentValue) => accumulator + Number(currentValue.subTotal), 0);
    };

    public updateTotal = (): void => {
        this.grandTotal = this.items.reduce((accumulator, currentValue) => accumulator + Number(currentValue.grandTotal), 0);
    };

    public emptyCart = () => {
        this.items = [];
        this.discountTotal = 0;
        this.taxTotal = 0;
        this.subTotal = 0;
        this.grandTotal = 0;
    };
    
    public toTransaction = () => {
        let transaction = new SaleTransaction();
        transaction.customer = this.customer;
        transaction.amount = transaction.getAmountFromCart(this);
        transaction.installment = transaction.getFullPaymentInstallment();
        transaction.items = transaction.getItemsFromCartItems(this);
        transaction.paymentOption = this.paymentOption;
        return transaction;
    };

}
