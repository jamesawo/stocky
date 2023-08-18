import {HttpResponse} from '@angular/common/http';
import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzCheckBoxOptionInterface} from 'ng-zorro-antd/checkbox';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {ModalOrDrawer} from 'src/app/data/payload/common.enum';
import {ProductRoutes, SupplierRoutes} from '../../../../../data/constant/routes.constant';
import {DatePickerComponent} from '../../../../../shared/components/date-picker/date-picker.component';
import {SearchModelDropdownComponent} from '../../../../../shared/components/search-model-dropdown/search-model-dropdown.component';
import {UtilService} from '../../../../../shared/utils/util.service';
import {Stock, StockExpenses, StockItem, StockPrice, StockSettlement} from '../../../_data/stock.payload';
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

    public stock = new Stock();

    public form: FormGroup = this.formBuild;
    public isMainFormOpen = true;
    public minSearchCharacter = 3;
    public itemsList: StockItem[] = [];
    public checkOptionsOne: NzCheckBoxOptionInterface[] = [
        {label: 'Group Settlement', value: 'settlement', checked: false},
        {label: 'Group Expenses', value: 'expenses', checked: false}
    ];
    public isGroupExpenseOpen = true;

    protected readonly ModalOrDrawer = ModalOrDrawer;
    protected readonly isFormControlInvalid = this.util.isFormControlInvalid;
    protected readonly SupplierRoutes = SupplierRoutes;
    protected readonly ProductRoutes = ProductRoutes;
    protected readonly getNzFormControlValidStatus = this.util.getNzFormControlValidStatus;

    constructor(
        private fb: FormBuilder,
        private usecase: ManageStockUsecase,
        private notification: NzNotificationService,
        private msg: NzMessageService,
        private util: UtilService
    ) {
    }

    public get currentDate() {
        return this.util.getDateString();
    }

    /**
     * Returns a form group instance for building a form.
     *
     * @returns {FormGroup} The form group instance.
     */
    public get formBuild() {
        return this.fb.group({
            supplier: [null, [Validators.required]],
            product: [null, [Validators.required]],
            quantity: [null, [Validators.required]],
            date: [null, [Validators.required]],
            uploads: [null]
        });
    }

    /**
     * Save stock form
     *
     * Calls save method on stock usecase and passes the stock object for saving
     */
    public onSaveStockForm = async () => {
        this.updateStockItemsList();
        let response = await this.util.handleUsecaseRequest(this.usecase.save(this.stock), this.notification);
        this.onAfterFormSubmit(response);
        return response.ok;
    };

    /**
     * Handles adding a stock item to the list.
     *
     * This method performs the following steps:
     * 1. Checks if the form is valid. If not, marks the form fields as dirty and touched.
     * 2. Checks if the item already exists in the list. If so, displays an error message and returns.
     * 3. Processes adding the item by performing the following actions:
     *    - Toggles the main form.
     *    - Adds the new stock item to the items list and returns the updated list.
     *    - Updates the stock meta items list.
     *    - Triggers the onExpensesChange event.
     */
    public handleAddStockItemToList = () => {
        // check if form is valid
        if (this.form.invalid) {
            this.util.markFormFieldsAsDirtyAndTouched(this.form);
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
        this.updateStockItemsList();
        this.onExpensesChange();
    };

    /**
     * Removes a stock item from the list based on the provided item index.
     *
     * @param {number} itemIndex - The index of the item to be removed.
     */
    public onRemoveStockItem(itemIndex: number) {
        this.itemsList = this.itemsList.filter((_, index) => index !== itemIndex);
        this.updateStockItemsList();
        this.onExpensesChange();
        this.updateStockSettlement();
    }

    /**
     * Removes all stock items from the list.
     *
     * This method performs the following actions:
     * - Clears the `itemsList` by assigning an empty array.
     * - Updates the stock items list.
     * - Triggers the `onExpensesChange` event.
     * - Updates the stock settlement.
     */
    public onRemoveAllStockItems() {
        this.itemsList = [];
        this.updateStockItemsList();
        this.onExpensesChange();
        this.updateStockSettlement();
    }

    /**
     * An empty action function.
     *
     * This method serves as a placeholder or default function that does nothing.
     */
    public emptyAction = () => {
    };

    /**
     * Clears the main form and resets its values.
     *
     * This method performs the following actions:
     * - Resets the form by calling the `reset()` method.
     * - Rebuilds the form using the `formBuild` method.
     * - Clears the supplier search component, if available.
     * - Clears the product search component, if available.
     * - Clears the date picker component, if available.
     * - Sets the default date of the date picker component to the current date.
     */
    public onClearMainForm = () => {
        this.form.reset();
        this.form = this.formBuild;
        this.supplierSearchComponent?.clear();
        this.productSearchComponent?.clear();
        this.datePickerComponent?.onClear();
        this.datePickerComponent?.setDefaultDate(this.currentDate);
    };

    /**
     * Gets a formControl valid status using a formGroup
     * @param name
     */
    public status(name: string) {
        return this.util.getNzFormControlValidStatus(name, this.form);
    }

    /**
     * Assigns the Stock isGroupedSettlement or isGroupedExpenses
     * base on the value of the group checkbox in the user interface
     * @param checkOptionsOne
     */
    public onGroupCheckBoxChange(checkOptionsOne: NzCheckBoxOptionInterface[]) {
        // [0] => Group Settlement
        // [1] => Group Expenses
        this.stock.isGroupedSettlement = checkOptionsOne[0].checked!;
        this.stock.isGroupedExpenses = checkOptionsOne[1].checked!;
        this.updateStockItemsExpensesIfGroupExpensesChange(checkOptionsOne);
    }

    /**
     * Handles the change of stock price for a specific stock item.
     *
     * @param {StockItem} stockItem - The stock item object.
     * @param {StockPrice} stockPrice - The updated stock price object.
     */
    public onStockPriceChange(stockItem: StockItem, stockPrice: StockPrice) {
        const costPrice = stockPrice.costPrice ?? 0;
        const quantity = stockItem.productQuantity ?? 0;
        const totalAmount = Number(costPrice) * Number(quantity);

        this.updateStockItemSettlement(stockItem, totalAmount);
        this.updateStockSettlement();
    }

    /**
     * Handles the change in stock expenses.
     *
     * Performs the following steps
     * - Checks if the stock is using groupedExpenses
     * - And if the param expenses is present and if so,
     * - It calls updateStockExpenses method on the Stock object instance.
     * - It updates all the stockItems expenses amount
     *
     * @param {StockExpenses[]} expenses - Optional. An array of stock expenses.
     */
    public onExpensesChange(expenses?: StockExpenses[]) {
        if (expenses && this.stock.isGroupedExpenses) {
            this.stock.updateStockExpenses(expenses);
        }
        const itemExpensesAmount = this.getItemExpensesAmount(expenses);
        this.updateAllStockItemsExpensesAmount(itemExpensesAmount);
    }

    /**
     * Updates the stock items' expenses if the group expenses checkbox is changed.
     *
     * This method performs the following steps:
     * - Step 1: Checks if the group expenses checkbox is checked.
     * - Step 2: If the checkbox is checked:
     *    - Step 2.1: Sets the isGroupedExpenses property of the stock to true.
     *    - Step 2.2: Updates the stock expenses to an empty array.
     *    - Step 2.3: Updates the expenses amount for all stock items to 0.
     *
     * @param {NzCheckBoxOptionInterface[]} checkOptionsOne - The checkbox options representing the group expenses checkbox.
     */
    private updateStockItemsExpensesIfGroupExpensesChange(checkOptionsOne: NzCheckBoxOptionInterface[]) {
        if (checkOptionsOne[1].checked) {
            this.stock.isGroupedExpenses = checkOptionsOne[1].checked;
            this.stock.updateStockExpenses([]);
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
     * @return StockItem[]
     **/
    private addNewStockItemToItemsListAndReturnList() {
        const list = [...this.itemsList];
        list.forEach(value => value.panelVisibility = false);
        list.push({...this.useFormValueToCreateNewItem()});
        list[list.length - 1].panelVisibility = true;
        return list;
    }

    /**
     * This method creates a new StockItem object.
     * It performs the following steps
     *
     * - Take the form value from FormGroup.
     * - Create new StockItem,
     * - Return newly created stockItem
     * @return StockItem
     * */
    private useFormValueToCreateNewItem(): StockItem {
        const stock = new StockItem();
        stock.panelVisibility = false;
        stock.supplier = this.form.controls['supplier'].value;
        stock.product = this.form.controls['product'].value;
        stock.productQuantity = this.form.controls['quantity'].value;
        stock.recordedDate = this.form.controls['date'].value;
        stock.expenses = [];
        stock.settlement = new StockSettlement();
        stock.price = new StockPrice();
        return stock;
    }

    /**
     * Calculates the expenses amount per item based on the provided list of stock expenses.
     *
     * @param {StockExpenses[]} list - Optional. An array of stock expenses.
     * @returns {number} The expenses amount per item.
     */
    private getItemExpensesAmount(list?: StockExpenses[]): number {
        const totalExpenses = this.getTotalExpensesAmount(list);
        const totalQuantity = this.getTotalQuantityOfProductsInStockItems();
        return Math.round(Number(totalExpenses) / Number(totalQuantity));
    }

    /**
     * Updates the expenses amount for all stock items.
     *
     * This method performs the following steps:
     * - Step 1: Retrieve the stockPrice object associated with each stock item.
     * - Step 2: Update the expensesAmount property of the stockPrice object with the provided amount.
     * - Step 3: Recalculate the selling price based on the updated expenses amount.
     *
     * @param {number} amount - The expenses amount to set for each stock item.
     */
    private updateAllStockItemsExpensesAmount(amount: number) {
        for (let stockItem of this.itemsList) {
            const stockPrice = stockItem.price;
            stockPrice.expensesAmount = amount;
            stockPrice.calculateSellingPrice!();
        }
    }

    /**
     * Updates the settlement for a stock item with the provided total amount.
     *
     * This method performs the following steps:
     * - Step 1: Update the amount property of the settlement with the provided total amount.
     * - Step 2: Set the paid property of the settlement to 0.
     * - Step 3: Calculate the balance by subtracting the paid amount from the total amount.
     * - Step 4: Update the stock settlement of the stock item.
     * - Step 5: Update the stock items list.
     *
     * @param {StockItem} stockItem - The stock item to update the settlement for.
     * @param {number} totalAmount - The total amount to set for the settlement.
     */
    private updateStockItemSettlement(stockItem: StockItem, totalAmount: number) {
        const settlement = stockItem.settlement;
        settlement.amount = totalAmount;
        settlement.paid = 0;
        settlement.balance = Number(settlement.amount) - Number(settlement.paid);
        stockItem.updateStockSettlement!(settlement);
        this.updateStockItemsList();
    }

    /**
     * Updates the stock settlement.
     *
     * This method performs the following steps:
     * - Step 1: Checks if the stock is using grouped settlement.
     * - Step 2: If grouped settlement is enabled:
     *    - Step 2.1: Calculates the total cost price of all stock items.
     *    - Step 2.2: Updates the amount property of the stock settlement with the total cost price.
     *    - Step 2.3: Calls the calculateBalance method of the stock settlement.
     *    - Step 2.4: Updates the stock settlement by calling the updateStockSettlement method of the stock.
     *
     * @return void
     */
    private updateStockSettlement(): void {
        const isGroupSettlement = this.stock.isGroupedSettlement;
        // if (isGroupSettlement) {}
        const totalCostPrice = this.getTotalCostPriceOfStockItems();
        const settlement = this.stock.settlement;
        settlement.amount = totalCostPrice;
        settlement.calculateBalance!();
        this.stock.updateStockSettlement(settlement);

    }

    /**
     * Update stock items
     *
     * It uses the itemList property of the component class to update the
     * Stock object stockItems property by calling updateStockItems method on the
     * Stock object instance.
     * @private
     */
    private updateStockItemsList() {
        this.stock.updateStockItems(this.itemsList);
    }

    /**
     * Checks if the form values (supplier and product) already exist in the stock items list.
     *
     * @returns {boolean} - Returns true if the form values already exist in the stock items list, false otherwise.
     */
    private isFormValueAlreadyPresentInStockItemList(): boolean {
        const stockSupplier = this.form.controls['supplier'].value;
        const stockProduct = this.form.controls['product'].value;

        return this.itemsList.some(stock => {
            const hasSupplier = stock.supplier?.id === stockSupplier.id;
            const hasProduct = stock.product?.id === stockProduct.id;
            return hasProduct && hasSupplier;
        });
    }

    /**
     * Toggles the main form accordion panel and the group expense accordion panel.
     *
     * This method performs the following steps:
     * - Step 1: Toggles the value of the `isMainFormOpen` property.
     * - Step 2: Toggles the value of the `isGroupExpenseOpen` property.
     *
     * Note: This method is used to control the open or collapse property of the main form accordion and the group expense accordion.
     */
    private onToggleMainForm() {
        this.isMainFormOpen = !this.isMainFormOpen;
        this.isGroupExpenseOpen = !this.isGroupExpenseOpen;
    }

    /**
     * Calculates the total cost price of all stock items.
     *
     * @returns {number} - The total cost price of all stock items.
     */
    private getTotalCostPriceOfStockItems() {
        return this.itemsList.reduce((sum, item) =>
            sum + (Number(item.price.costPrice) * Number(item.productQuantity) || 0), 0
        );
    }

    /**
     * Calculates the total amount of expenses.
     *
     * @param {StockExpenses[]} [list] - Optional. The list of expenses to calculate the total from. If not provided, the stock expenses will be used.
     * @returns {number} - The total amount of expenses.
     */
    private getTotalExpensesAmount(list?: StockExpenses[]): number {
        let expenses = list ?? this.stock.expenses;
        return expenses.reduce((sum, item) => sum + (item.amount || 0), 0);
    }

    /**
     * Calculates the total quantity of products in all stock items.
     *
     * @returns {number} - The total quantity of products in all stock items.
     */
    private getTotalQuantityOfProductsInStockItems() {
        return this.itemsList.reduce((sum, item) => sum + (item.productQuantity || 0), 0);
    }

    /**
     * Handles the response after a successful form submission
     *
     * Clears the main form
     * @param response
     * @private
     */
    private onAfterFormSubmit(response: HttpResponse<Stock>) {
        if (response.ok) {
            this.onClearMainForm();
        }
    }
}
