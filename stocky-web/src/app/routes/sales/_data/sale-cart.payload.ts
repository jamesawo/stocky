import {calculatePercentage} from '../../../shared/utils/util';
import {CustomerPayload} from '../../company/_data/company.payload';
import {ProductPayload} from '../../products/_data/product.payload';

export class SaleCartItem {
    id?: number;
    product: ProductPayload = new ProductPayload();
    quantity: number = 0;
    discount: number = 0;
    subTotal: number = 0;
    grandTotal: number = 0;
    tax: number = 0;

    constructor(product?: ProductPayload) {
        if (product && product.id) {
            this.product = product;
            this.increment();
            this.updateTax();
            this.updateDiscount();
        }
    }

    public get hasProduct(): boolean {
        return !!this.product && !!this.product.id;
    };

    public increment = (): void => {
        if (this.hasProduct) {
            this.quantity += 1;
            this.updateSubTotal();
        }
    };

    public decrement = (): void => {
        if (this.quantity > 1) {
            this.quantity -= 1;
            this.updateSubTotal();
        }
    };

    public updateSubTotal = (): void => {
        if (this.hasProduct) {
            const sellingPrice = this.product.price?.sellingPrice ?? 0;
            this.subTotal = Number(sellingPrice) * this.quantity;
            this.updateGrandTotal();
        }
    };

    public updateQuantity = (quantity: number) => {
        if (quantity >= 1) {
            this.quantity = quantity;
            this.updateSubTotal();
        }
    };

    public updateTax = (): void => {
        let taxSum = 0;
        const taxes = this.product.basic.taxes ?? [];
        for (let tax of taxes) {
            const percent = tax.percent ?? 0;
            const price = this.product?.price?.sellingPrice ?? 0;
            taxSum += calculatePercentage(percent, price);
        }
        this.tax = taxSum;
    };

    public updateDiscount = () => {
        if (this.hasProduct) {
            const price = this.product?.price;
            const sellingPrice = price?.sellingPrice ?? 0;
            const percent = price?.discount ?? 0;

            this.discount += calculatePercentage(percent, sellingPrice);
            this.updateSubTotal();
        }
    };

    public updateGrandTotal = (): void => {
        const sub = this.subTotal + this.tax;
        this.grandTotal = sub - this.discount;
    };

    public canProceedToPayment = (): {status: boolean, message: string} => {
        return {message: '', status: false};
    };

}

export class SaleCart {
    customer: CustomerPayload = new CustomerPayload();
    items: SaleCartItem[] = [];
    date: string = '';
    discountTotal: number = 0;
    taxTotal: number = 0;
    subTotal: number = 0;
    grandTotal: number = 0;

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

}
