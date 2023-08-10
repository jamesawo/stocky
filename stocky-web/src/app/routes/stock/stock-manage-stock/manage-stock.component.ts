import {Component, OnInit, ViewChild} from '@angular/core';
import {STOCK_MANAGE_CRUMBS} from '../../../data/constant/crumb.constant';
import {Message} from '../../../data/constant/message.constant';
import {SettingConstant} from '../../../data/constant/setting.constant';
import {SettingModuleEnum} from '../../../data/payload/common.enum';
import {TableCol} from '../../../shared/components/table/table.component';
import {SettingUsecase} from '../../settings/_usecase/setting.usecase';
import {StockManageAddComponent} from '../_components/stock-manage/stock-manage-add/stock-manage-add.component';

@Component({
    selector: 'app-manage-stock',
    templateUrl: './manage-stock.component.html',
    styles: []
})
export class ManageStockComponent implements OnInit {

    @ViewChild('stockManageAddComponent')
    public stockManageAddComponent?: StockManageAddComponent;

    public crumbs = STOCK_MANAGE_CRUMBS;
    public isOpenHeader = true;
    public isLoading = false;
    public tableCols: TableCol[] = [
        {title: 'Stock #'},
        {title: 'Recorded By'},
        {title: 'Recorded Date'},
        {title: 'Recorded items'},
        {title: 'Total Product Qty'},
        {title: 'Details'},
        {title: 'Action'}
    ];
    public isStockEnabled: boolean = false;
    public disableWarning = 'Stock is disabled in setting';
    public readonly message = Message;

    protected readonly Promise = Promise;

    constructor(private settingUsecase: SettingUsecase) {}

    public ngOnInit() {
        this.checkStockStatus().then();
    }

    public onSearch = async (): Promise<void> => {
    };

    public onReset = (): void => {
    };

    public onCancel = (): void => {
    };

    public onCreate = async () => this.stockManageAddComponent?.open();

    public async checkStockStatus(): Promise<void> {
        this.isStockEnabled = await this.settingUsecase.getByKeyAsBool(
            SettingConstant.SETTING_STOCK_ENABLE_STOCK,
            SettingModuleEnum.STOCK,
            true);
    }
}
