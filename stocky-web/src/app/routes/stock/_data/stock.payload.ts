import {calculateSellingPrice} from '../../../shared/utils/util';
import {SupplierPayload} from '../../company/_data/company.payload';
import {ProductPayload} from '../../products/_data/product.payload';

export class Stock {
}

export class StockSearch {
}

export class StockMetaSettlement {
    groupSettlement: StockSettlement = new StockSettlement();
    isGroupSettlement: boolean = false;

    constructor(groupSettlement?: StockSettlement, isGroupSettlement?: boolean) {
        this.groupSettlement = groupSettlement || this.groupSettlement;
        this.isGroupSettlement = isGroupSettlement || this.isGroupSettlement;
    }
}

export class StockMetaExpenses {
    isGroupExpenses: boolean = false;
    groupExpenses: StockExpenses[] = [];


    constructor(isGroupExpenses?: boolean, groupExpenses?: StockExpenses[]) {
        this.isGroupExpenses = isGroupExpenses || this.isGroupExpenses;
        this.groupExpenses = groupExpenses || this.groupExpenses;
    }
}

export class StockMeta {
    stockRecordDate?: string;
    stockSettlement: StockMetaSettlement = new StockMetaSettlement();
    stockExpenses: StockMetaExpenses = new StockMetaExpenses();
    stockItems?: StockItemPanel[] = [];


    updateStockRecordDate(value: string) {
        this.stockRecordDate = value;
    }

    updateStockSettlement(value: StockMetaSettlement) {
        this.stockSettlement = value;
    }

    updateStockExpenses(value: StockMetaExpenses) {
        this.stockExpenses = value;
    }

    updateStockItems(value: StockItemPanel[]) {
        this.stockItems = value;
    }
}

export class StockItemPanel {
    panelVisibility?: boolean = false;
    stockSupplier?: SupplierPayload;
    stockProductQuantity?: number;
    stockProduct?: ProductPayload;
    stockExpenses: StockExpenses[] = [];
    stockSettlement: StockSettlement = new StockSettlement();
    stockPrice: StockPrice = new StockPrice();
    stockRecordedDate?: string;

    updateStockSettlement? = (value: StockSettlement) => {
        this.stockSettlement = value;
    };
}

export class StockPrice {
    costPrice?: number;
    markupPercent?: number;
    sellingPrice?: number;
    expensesAmount: number = 0;

    calculateSellingPrice? = () => {
        let costPrice = this.costPrice ?? 0;
        let markUpPercent = this.markupPercent ?? 0;

        const expensesCostPrice = Number(costPrice) + Number(this.expensesAmount);
        this.sellingPrice = calculateSellingPrice(expensesCostPrice, markUpPercent);
    };
}

export class StockSettlement {
    amount?: number;
    paid?: number;
    balance?: number;

    calculateBalance? = () => {
        const amount = this.amount ?? 0;
        const paid = this.paid ?? 0;
        const balance = Number(amount) - Number(paid);
        this.balance = paid > amount ? 0 : balance;
    };

}

export class StockExpenses {
    id?: number;
    title?: string;
    amount?: number;
}


