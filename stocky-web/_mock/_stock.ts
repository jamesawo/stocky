import {StockItem, StockPrice, StockSettlement} from '../src/app/routes/stock/_data/stock.payload';
import {MOCK_PRODUCT} from './_product';
import {MOCK_SUPPLIER} from './_supplier';


const mockSettlement = new StockSettlement();
const mockStockPrice = new StockPrice();


const mockStockPanel = new StockItem();
mockStockPanel.panelVisibility = false;
mockStockPanel.stockSupplier = MOCK_SUPPLIER;
mockStockPanel.stockProductQuantity = 45;
mockStockPanel.stockProduct = MOCK_PRODUCT;
mockStockPanel.stockExpenses = [];
mockStockPanel.stockSettlement = mockSettlement;
mockStockPanel.stockPrice = mockStockPrice;
mockStockPanel.stockRecordedDate = '';


export const MOCK_STOCK_ITEM_PANEL: StockItem = mockStockPanel;
