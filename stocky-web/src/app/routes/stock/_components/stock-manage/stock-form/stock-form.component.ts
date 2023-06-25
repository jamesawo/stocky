import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzCheckBoxOptionInterface} from 'ng-zorro-antd/checkbox';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {ModalOrDrawer} from 'src/app/data/payload/common.enum';
import {ProductRoutes, SupplierRoutes} from '../../../../../data/constant/routes.constant';
import {DatePickerComponent} from '../../../../../shared/components/date-picker/date-picker.component';
import {SearchModelDropdownComponent} from '../../../../../shared/components/search-model-dropdown/search-model-dropdown.component';
import {getDateString, getNzFormControlValidStatus, isFormControlInvalid, markFormFieldsAsDirtyAndTouched} from '../../../../../shared/utils/util';
import {
    StockExpenses,
    StockItemPanel,
    StockMeta,
    StockMetaExpenses,
    StockMetaSettlement,
    StockPrice,
    StockSettlement
} from '../../../_data/stock.payload';
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

    constructor(
        private fb: FormBuilder,
        private usecase: ManageStockUsecase,
        private notification: NzNotificationService,
        private msg: NzMessageService
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
    
    public ngOnInit() {

    }

    public onSaveStockForm = () => {
        this.updateStockMetaItemsList();
        console.log(this.stockMeta);
    };

    public handleAddStockItemToList = () => {
        // check if form is valid
        if (this.form.invalid) {
            markFormFieldsAsDirtyAndTouched(this.form);
            return;
        }

        // check if the item already exist in the list
        if (this.isFormValueAlreadyPresentInStockItemList()) {
            this.msg.error('Similar Product Already Added');
            return;
        }

        // process add item
        this.onToggleMainForm();
        this.itemsList = this.addNewStockItemToItemsListAndReturnList();
        this.updateStockMetaItemsList();
        this.onExpensesChange();
    };

    public onRemoveStockItem(itemIndex: number) {
        this.itemsList = this.itemsList.filter((_, index) => index !== itemIndex);
        this.updateStockMetaItemsList();
        this.onExpensesChange();
        this.updateStockMetaSettlement();
    }

    public onRemoveAllStockItems() {
        this.itemsList = [];
        this.updateStockMetaItemsList();
        this.onExpensesChange();
        this.updateStockMetaSettlement();
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

    };

    public status(name: string) {
        return getNzFormControlValidStatus(name, this.form);
    }

    public onGroupCheckBoxChange(checkOptionsOne: NzCheckBoxOptionInterface[]) {
        // [0] => Group Settlement
        // [1] => Group Expenses
        this.stockMeta.stockSettlement.isGroupSettlement = checkOptionsOne[0].checked!;
        this.stockMeta.stockExpenses.isGroupExpenses = checkOptionsOne[1].checked!;
        this.updateStockItemsExpensesIfGroupExpensesChange(checkOptionsOne);
    }

    public onStockPriceChange(stockItemPanel: StockItemPanel, stockPrice: StockPrice) {
        const costPrice = stockPrice.costPrice ?? 0;
        const quantity = stockItemPanel.stockProductQuantity ?? 0;
        const totalAmount = Number(costPrice) * Number(quantity);

        this.updateStockItemSettlement(stockItemPanel, totalAmount);
        this.updateStockMetaSettlement();
    }

    public onExpensesChange(expenses?: StockExpenses[]) {
        if (expenses) {
            const {isGroupExpenses} = this.stockMeta.stockExpenses;
            this.stockMeta.updateStockExpenses({isGroupExpenses, groupExpenses: expenses});
        }
        const itemExpensesAmount = this.getItemExpensesAmount(expenses);
        this.updateAllStockItemsExpensesAmount(itemExpensesAmount);
    }

    private updateStockItemsExpensesIfGroupExpensesChange(checkOptionsOne: NzCheckBoxOptionInterface[]) {
        if (checkOptionsOne[1].checked) {
            this.stockMeta.updateStockExpenses(new StockMetaExpenses(checkOptionsOne[1].checked));
            this.updateAllStockItemsExpensesAmount(0);
        }
    }

    /**
     * Add new stock item to items list.
     * Clones the items list, to prevent working on main items list.
     * Closes all the accordion panels in the cloned list.
     * Push a new item into the cloned list.
     * Opens the new item accordion panel.
     * And returns the cloned list to its caller.
     *
     * @return StockItemPanel[]
     **/
    private addNewStockItemToItemsListAndReturnList() {
        const list = [...this.itemsList];
        list.forEach(value => value.panelVisibility = false);
        list.push({...this.useFormValueToCreateNewItemPanel()});
        list[list.length - 1].panelVisibility = true;
        return list;
    }

    /** Take the form value from FormGroup.
     * Create new StockItemPanel,
     * Return newly created stockItemPanel
     * @return StockItemPanel
     * */
    private useFormValueToCreateNewItemPanel(): StockItemPanel {
        const stock = new StockItemPanel();
        stock.panelVisibility = false;
        stock.stockSupplier = this.form.controls['supplier'].value;
        stock.stockProduct = this.form.controls['product'].value;
        stock.stockProductQuantity = this.form.controls['quantity'].value;
        stock.stockRecordedDate = this.form.controls['date'].value;
        stock.stockExpenses = [];
        stock.stockSettlement = new StockSettlement();
        stock.stockPrice = new StockPrice();
        return stock;
    }

    private getItemExpensesAmount(list?: StockExpenses[]): number {
        const totalExpenses = this.getTotalExpensesAmount(list);
        const totalQuantity = this.getTotalQuantityOfProductsInStockItems();
        return Math.round(Number(totalExpenses) / Number(totalQuantity));
    }

    private updateAllStockItemsExpensesAmount(amount: number) {
        for (let stockItemPanel of this.itemsList) {
            const stockPrice = stockItemPanel.stockPrice;
            stockPrice.expensesAmount = amount;
            stockPrice.calculateSellingPrice!();
        }
    }

    private updateStockItemSettlement(stockItemPanel: StockItemPanel, totalAmount: number) {
        const settlement = stockItemPanel.stockSettlement;
        settlement.amount = totalAmount;
        settlement.paid = 0;
        settlement.balance = Number(settlement.amount) - Number(settlement.paid);
        stockItemPanel.updateStockSettlement!(settlement);
        this.updateStockMetaItemsList();
    }

    private updateStockMetaSettlement() {
        const totalCostPrice = this.getTotalCostPriceOfStockItems();
        const isGroupSettlement = this.stockMeta.stockSettlement.isGroupSettlement;
        const settlement = this.stockMeta.stockSettlement.groupSettlement;
        settlement.amount = totalCostPrice;
        settlement.calculateBalance!();
        const metaSettlement = new StockMetaSettlement(settlement, isGroupSettlement);
        this.stockMeta.updateStockSettlement(metaSettlement);
    }

    private updateStockMetaItemsList() {
        this.stockMeta.updateStockItems(this.itemsList);
    }

    private isFormValueAlreadyPresentInStockItemList(): boolean {
        const stockSupplier = this.form.controls['supplier'].value;
        const stockProduct = this.form.controls['product'].value;

        return this.itemsList.some(stock => {
            const hasSupplier = stock.stockSupplier?.id === stockSupplier.id;
            const hasProduct = stock.stockProduct?.id === stockProduct.id;
            return hasProduct && hasSupplier;
        });
    }

    private onToggleMainForm() {
        this.isMainFormOpen = !this.isMainFormOpen;
        this.isGroupExpenseOpen = !this.isGroupExpenseOpen;
    }

    private getTotalCostPriceOfStockItems() {
        return this.itemsList.reduce((sum, item) =>
            sum + (Number(item.stockPrice.costPrice) * Number(item.stockProductQuantity) || 0), 0
        );
    }

    private getTotalExpensesAmount(list?: StockExpenses[]): number {
        let expenses = list ?? this.stockMeta.stockExpenses.groupExpenses;
        return expenses.reduce((sum, item) => sum + (item.amount || 0), 0);
    }

    private getTotalQuantityOfProductsInStockItems() {
        return this.itemsList.reduce((sum, item) => sum + (item.stockProductQuantity || 0), 0);
    }

}
