import {Component, OnInit} from '@angular/core';
import {getFromLocal, storeInLocal} from '../../../../shared/utils/util';
import {UserPreferenceEnum} from '../../../user/_data/user-preference.enum';
import {SaleCartNotifyType, SaleProductSearchDisplayView} from '../../_data/sale-cart.enum';
import {SaleCartUsecase} from '../../_usecase/sale-cart.usecase';

@Component({
    selector: 'app-sales-product-search-and-selection',
    templateUrl: './sales-product-search-and-selection.component.html',
    styles: []
})
export class SalesProductSearchAndSelectionComponent implements OnInit {

    public readonly display = SaleProductSearchDisplayView;
    public isListView = false;
    public lowStockVisibility = true;

    constructor(private cartUsecase: SaleCartUsecase) {}

    public ngOnInit(): void {
        this.getPreference();
    }


    public toggleLowStockVisibility = () => {
        this.lowStockVisibility = !this.lowStockVisibility;
    };

    public handleClearSearchResult = () => {
        this.cartUsecase.notifyType.next(SaleCartNotifyType.CLEAR_PRODUCT_RESULT);
    };

    public toggleView = () => {
        this.isListView = !this.isListView;
        this.saveUserPreference();
    };

    private saveUserPreference() {
        if (this.isListView) {
            storeInLocal(
                UserPreferenceEnum.SALE_PRODUCT_SEARCH_DISPLAY_TYPE,
                SaleProductSearchDisplayView.list
            );
        } else {
            storeInLocal(
                UserPreferenceEnum.SALE_PRODUCT_SEARCH_DISPLAY_TYPE,
                SaleProductSearchDisplayView.grid
            );
        }
    }

    private getPreference() {
        let value = getFromLocal(UserPreferenceEnum.SALE_PRODUCT_SEARCH_DISPLAY_TYPE);
        if (value && value == SaleProductSearchDisplayView.list.toString()) {
            this.isListView = true;
        }
    }


}
