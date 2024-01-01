import {NgModule, Type} from '@angular/core';
import {SharedModule} from '@shared';
import {CompanyModule} from '../company/company.module';
import {ProductsModule} from '../products/products.module';
import {SaleCartAmountComponent} from './_component/sale-cart-amount/sale-cart-amount.component';
import {SaleCartButtonsComponent} from './_component/sale-cart-buttons/sale-cart-buttons.component';
import {
    SaleCartCustomerSearchComponent
} from './_component/sale-cart-customer-search/sale-cart-customer-search.component';
import {SaleCartItemsComponent} from './_component/sale-cart-items/sale-cart-items.component';
import {
    SaleCartPaymentOptionsComponent
} from './_component/sale-cart-payment-options/sale-cart-payment-options.component';
import {SaleCartSummaryComponent} from './_component/sale-cart-summary/sale-cart-summary.component';
import {SaleCartComponent} from './_component/sale-cart/sale-cart.component';
import {SalesProductGridComponent} from './_component/sales-product-grid/sales-product-grid.component';
import {SalesProductListComponent} from './_component/sales-product-list/sales-product-list.component';
import {
    SalesProductSearchAndSelectionComponent
} from './_component/sales-product-search-and-selection/sales-product-search-and-selection.component';
import {SalesProductSearchComponent} from './_component/sales-product-search/sales-product-search.component';
import {SalesProductSelectionComponent} from './_component/sales-product-selection/sales-product-selection.component';
import {
    SalesTransactionReceiptViewerComponent
} from './_component/sales-transaction-receipt-viewer/sales-transaction-receipt-viewer.component';
import {SalesCashierShiftComponent} from './sales-cashier-shift/sales-cashier-shift.component';
import {SalesOrderComponent} from './sales-order/sales-order.component';
import {SalesPosComponent} from './sales-pos/sales-pos.component';
import {SalesRefundComponent} from './sales-refund/sales-refund.component';
import {SalesReprintReceiptComponent} from './sales-reprint-receipt/sales-reprint-receipt.component';
import {SalesRoutingModule} from './sales-routing.module';

const COMPONENTS: Array<Type<void>> = [
    SalesPosComponent,
    SalesOrderComponent,
    SalesRefundComponent,
    SalesProductSearchComponent,
    SalesProductGridComponent,
    SalesProductListComponent,
    SalesProductSelectionComponent,
    SalesProductSearchAndSelectionComponent,
    SaleCartComponent,
    SaleCartCustomerSearchComponent,
    SaleCartItemsComponent,
    SaleCartAmountComponent,
    SaleCartButtonsComponent,
    SaleCartPaymentOptionsComponent,
    SaleCartSummaryComponent,
    SalesTransactionReceiptViewerComponent,
    SalesCashierShiftComponent,
    SalesReprintReceiptComponent

];

@NgModule({
    imports: [SalesRoutingModule, SharedModule, ProductsModule, CompanyModule],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS]

})
export class SalesModule {
}
