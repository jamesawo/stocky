import {Component, ViewChild} from '@angular/core';
import {NzDrawerSize} from 'ng-zorro-antd/drawer';
import {ModalOrDrawer} from '../../../../../data/payload/common.enum';
import {toggleModalOrDrawer} from '../../../../../shared/utils/util';
import {StockFormComponent} from '../stock-form/stock-form.component';

@Component({
    selector: 'app-stock-manage-add',
    templateUrl: './stock-manage-add.component.html',
    styles: []
})
export class StockManageAddComponent {

    @ViewChild('stockFormComponent')
    public stockFormComponent?: StockFormComponent;

    public showDrawer = false;
    public showModal = false;
    public drawerSize: NzDrawerSize = 'large';
    public isLoading = false;
    protected readonly ModalOrDrawer = ModalOrDrawer;

    public async handleFormSave() {
        const response = await this.stockFormComponent?.onSaveStockForm();
        if (response) {
            this.toggleDisplay();
        }

    }

    public toggleDisplay = (type: ModalOrDrawer = ModalOrDrawer.DRAWER) => {
        const {showModal, showDrawer} = toggleModalOrDrawer(type, this.showDrawer, this.showModal);
        this.showDrawer = showDrawer;
    };

    public open = () => {
        this.toggleDisplay();
    };

}
