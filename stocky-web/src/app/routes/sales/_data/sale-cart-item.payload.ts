import {calculatePercentage} from '../../../shared/utils/util';
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
