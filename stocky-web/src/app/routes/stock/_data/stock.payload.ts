import {UtilService} from '../../../shared/utils/util.service';
import {SupplierPayload} from '../../company/_data/company.payload';
import {ProductPayload} from '../../products/_data/product.payload';
import {StockStatus} from './stock.enum';

export class StockSearch {
}

export class Stock {

    createdAt?: string;
    isActiveStatus?: boolean;
    code?: string;
    isGroupedExpenses: boolean = false;
    isGroupedSettlement: boolean = false;
    openDate?: string;
    closedDate?: string;
    status?: StockStatus;
    recordDate?: string;
    settlement: StockSettlement = new StockSettlement();
    expenses: StockExpenses[] = [];
    stockItems?: StockItem[] = [];

    updateStockRecordDate(value: string) {
        this.recordDate = value;
    }

    updateStockSettlement(value: StockSettlement) {
        this.settlement = value;
    }

    updateStockExpenses(value: StockExpenses[]) {
        this.expenses = value;
    }

    updateStockItems(value: StockItem[]) {
        this.stockItems = value;
    }
}

export class StockItem {
    panelVisibility?: boolean = false;
    supplier?: SupplierPayload;
    productQuantity?: number;
    product?: ProductPayload;
    expenses: StockExpenses[] = [];
    settlement: StockSettlement = new StockSettlement();
    price: StockPrice = new StockPrice();
    recordedDate?: string;

    updateStockSettlement? = (value: StockSettlement) => {
        this.settlement = value;
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
        this.sellingPrice = UtilService.calculateSellingPrice(expensesCostPrice, markUpPercent);
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


