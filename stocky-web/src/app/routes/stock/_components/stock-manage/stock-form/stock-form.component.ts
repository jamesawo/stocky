import {HttpResponse} from '@angular/common/http';
import {Component, Input, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzCheckBoxOptionInterface} from 'ng-zorro-antd/checkbox';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {ModalOrDrawer} from 'src/app/data/payload/common.enum';
import {MOCK_STOCK_ITEM_PANEL} from '../../../../../../../_mock/_stock';
import {ProductRoutes, SupplierRoutes} from '../../../../../data/constant/routes.constant';
import {CommonAddProps, PopupViewProps} from '../../../../../data/payload/common.types';
import {DatePickerComponent} from '../../../../../shared/components/date-picker/date-picker.component';
import {SearchModelDropdownComponent} from '../../../../../shared/components/search-model-dropdown/search-model-dropdown.component';
import {getDateString, getNzFormControlValidStatus, isFormControlInvalid} from '../../../../../shared/utils/util';
import {ExpensesPayload} from '../../../../company/_data/company.payload';
import {StockItemPanel, StockMeta, StockPrice} from '../../../_data/stock.payload';
import {ManageStockUsecase} from '../../../_usecase/manage-stock.usecase';

@Component({
    selector: 'app-stock-form',
    templateUrl: './stock-form.component.html',
    styles: []
})
export class StockFormComponent {
    @ViewChild('supplierSearchComponent')
    public supplierSearchComponent?: SearchModelDropdownComponent;

    @ViewChild('productSearchComponent')
    public productSearchComponent?: SearchModelDropdownComponent;

    @ViewChild('datePickerComponent')
    public datePickerComponent?: DatePickerComponent;

    @Input()
    public props: CommonAddProps = {};

    @Input()
    public popup: PopupViewProps = {display: ModalOrDrawer.DRAWER};

    @Input()
    public showButton = false;

    public stockMeta = new StockMeta();

    public form: FormGroup = this.formBuild;
    public isMainFormOpen = true;
    public minSearchCharacter = 3;
    public itemsList: StockItemPanel[] = [];
    public checkOptionsOne: NzCheckBoxOptionInterface[] = [
        {label: 'Group Settlement', value: 'settlement', checked: false},
        {label: 'Group Expenses', value: 'expenses', checked: false}
    ];
    public isGroupExpenseOpen = true;

    protected readonly ModalOrDrawer = ModalOrDrawer;
    protected readonly isFormControlInvalid = isFormControlInvalid;
    protected readonly SupplierRoutes = SupplierRoutes;
    protected readonly ProductRoutes = ProductRoutes;
    protected readonly getNzFormControlValidStatus = getNzFormControlValidStatus;
    protected readonly menubar = menubar;

    constructor(
        private fb: FormBuilder,
        private usecase: ManageStockUsecase,
        private notification: NzNotificationService
    ) {}

    public get currentDate() {
        return getDateString();
    }

    public get formBuild() {
        return this.fb.group({
            supplier: [null, [Validators.required]],
            product: [null, [Validators.required]],
            quantity: [null, [Validators.required]],
            date: [null, [Validators.required]],
            uploads: [null]
        });
    }

    public get isDrawer() {
        return this.popup.display == ModalOrDrawer.DRAWER;
    }

    public get itemExpenseAmount() {
        const expenses = this.stockMeta.stockExpenses.groupExpenses;
        const totalExpenses = expenses.reduce((sum, item) => sum + (item.amount || 0), 0);
        const totalQty = this.itemsList.reduce((sum, item) => sum + (item.stockProductQuantity || 0), 0);
        return Math.round(Number(totalExpenses) / Number(totalQty));
    }

    public ngOnInit() {

    }

    public onSaveStockForm = () => {
        this.stockMeta = {...this.stockMeta, stockItems: this.itemsList};
        console.log(this.stockMeta);
    };

    public onAddStockItemToList = () => {
        // if (this.form.invalid) {
        //     markFormFieldsAsDirtyAndTouched(this.form);
        //     return;
        // }
        // this.itemsList.push(this.createNewStockItem());
        //
        this.onToggleMainForm();
        const list = [...this.itemsList];
        list.forEach(value => value.panelVisibility = false);
        list.push({...MOCK_STOCK_ITEM_PANEL});
        list[list.length - 1].panelVisibility = true;

        this.itemsList = list;


        // this.itemsList.push(MOCK_STOCK_ITEM_PANEL);
        // this.onCloseAllPanel();
        // this.onClearMainForm();
        // this.onToggleMainForm();
        // this.itemsList[this.itemsList.length - 1].panelVisibility = true;
    };

    public onRemoveStockItem(itemIndex: number) {
        this.itemsList = this.itemsList.filter((_, index) => index !== itemIndex);
    }

    public onRemoveAllStockItems() {
        this.itemsList = [];
    }

    public emptyAction = () => {};

    public onClearMainForm = () => {
        this.form.reset();
        this.form = this.formBuild;
        this.supplierSearchComponent?.clear();
        this.productSearchComponent?.clear();
        this.datePickerComponent?.onClear();
        this.datePickerComponent?.setDefaultDate(this.currentDate);
    };

    public onCreate = async () => {
        // if (this.form.invalid) {
        //     markFormFieldsAsDirtyAndTouched(this.form);
        //     this.notification.warning('Validation error', 'Please check the fields, some are incorrect');
        //     return;
        // }
        // const payload = this.form.value;
        //
        // const response = await handleUsecaseRequest(this.usecase.save(payload), this.notification);
        // this.onAfterFormSubmit(response);
    };

    public status(name: string) {
        return getNzFormControlValidStatus(name, this.form);
    }

    public onGroupCheckBoxChange(checkOptionsOne: NzCheckBoxOptionInterface[]) {
        this.stockMeta.stockSettlement.isGroupSettlement = checkOptionsOne[0].checked!;
        this.stockMeta.stockExpenses.isGroupExpenses = checkOptionsOne[1].checked!;
    }

    public onStockPriceChange(stockItemPanel: StockItemPanel, stockPrice: StockPrice) {
        const costPrice = stockPrice.costPrice ?? 0;
        const quantity = stockItemPanel.stockProductQuantity ?? 0;
        const totalAmount = Number(costPrice) * Number(quantity);
        this.resetSettlementFigures(stockItemPanel, totalAmount);
    }

    private resetSettlementFigures(stockItemPanel: StockItemPanel, totalAmount: number) {
        const settlement = stockItemPanel.stockSettlement;
        settlement.amount = totalAmount;
        settlement.paid = 0;
        settlement.balance = Number(settlement.amount) - Number(settlement.paid);

        stockItemPanel.stockSettlement = {...settlement};
    }

    private onToggleMainForm() {
        this.isMainFormOpen = !this.isMainFormOpen;
        this.isGroupExpenseOpen = !this.isGroupExpenseOpen;
    }

    private onAfterFormSubmit(response: HttpResponse<ExpensesPayload>): void {
        if (response && response.ok) {
            this.form.reset();
            this.form = this.formBuild;
        }
    }
}
