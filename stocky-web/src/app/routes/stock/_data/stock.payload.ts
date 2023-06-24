import {SupplierPayload} from '../../company/_data/company.payload';
import {ProductPayload} from '../../products/_data/product.payload';

export class Stock {
}

export class StockSearch {
}

export class StockMeta {
    stockRecordDate?: string;
    stockSettlement: {groupSettlement: StockSettlement; isGroupSettlement: boolean;} = {
        isGroupSettlement: false,
        groupSettlement: new StockSettlement()
    };
    stockExpenses: {isGroupExpenses: boolean; groupExpenses: StockExpenses[];} = {isGroupExpenses: false, groupExpenses: []};
    stockItems?: StockItemPanel[] = [];
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
}

export class StockPrice {
    costPrice?: number;
    markupPercent?: number;
    sellingPrice?: number;
}

export class StockSettlement {
    amount?: number;
    paid?: number;
    balance?: number;
}

export class StockExpenses {
    id?: number;
    title?: string;
    amount?: number;
}


