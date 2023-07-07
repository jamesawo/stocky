import {StockItem, StockPrice, StockSettlement} from '../src/app/routes/stock/_data/stock.payload';
import {MOCK_PRODUCT} from './_product';
import {MOCK_SUPPLIER} from './_supplier';


const mockSettlement = new StockSettlement();
const mockStockPrice = new StockPrice();


const mockStockPanel = new StockItem();
mockStockPanel.panelVisibility = false;
mockStockPanel.supplier = MOCK_SUPPLIER;
mockStockPanel.productQuantity = 45;
mockStockPanel.product = MOCK_PRODUCT;
mockStockPanel.expenses = [];
mockStockPanel.settlement = mockSettlement;
mockStockPanel.price = mockStockPrice;
mockStockPanel.recordedDate = '';


export const MOCK_STOCK_ITEM_PANEL: StockItem = mockStockPanel;
