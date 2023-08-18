import {Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Observable, of} from 'rxjs';
import {UtilService} from '../../../../../shared/utils/util.service';
import {StockExpenses} from '../../../_data/stock.payload';

@Component({
    selector: 'app-stock-item-extra-expenses',
    templateUrl: './stock-item-extra-expenses.component.html',
    styles: []
})
export class StockItemExtraExpensesComponent {
    @ViewChild('titleInputElement')
    public inputElement?: ElementRef;

    @Input()
    public expenses: StockExpenses[] = [];

    @Output()
    public expensesChange = new EventEmitter<StockExpenses[]>();

    public form = this.buildForm;
    public tableList?: Observable<any> = of([]);
    protected readonly getNzFormControlValidStatus = this.util.getNzFormControlValidStatus;

    constructor(
        private fb: FormBuilder,
        private msg: NzMessageService,
        private renderer: Renderer2,
        private util: UtilService
    ) {}

    public get totalAmount() {
        return this.expenses.reduce((sum, item) => sum + (item.amount || 0), 0);
    }

    private get buildForm() {
        return this.fb.group({
            amount: [null, Validators.required],
            title: [null, Validators.required]
        });
    }

    public onHandleAddItem = () => {
        if (this.form.invalid) {
            this.util.markFormFieldsAsDirtyAndTouched(this.form);
            return;
        }
        const newItem = <StockExpenses>this.form.value;
        const flag = this.expenses.some(item => item.title === newItem.title);
        if (flag) {
            this.msg.error('Similar item already exist.');
            return;
        }

        this.expenses = [...this.expenses, newItem];
        this.tableList = of(this.expenses);
        this.onNotifyChange();
        this.onResetForm();
        this.setFocusOnTitleInputField();
    };

    public onHandleRemoveItem = (payload?: StockExpenses) => {
        if (payload) {
            const list = [...this.expenses];
            this.expenses = list.filter(value => value.title !== payload.title);
            this.tableList = of(this.expenses);
            this.onNotifyChange();
            this.setFocusOnTitleInputField();
        }
    };

    private onResetForm() {
        this.form.reset();
        this.form = this.buildForm;
    }

    private setFocusOnTitleInputField() {
        this.renderer.selectRootElement(this.inputElement?.nativeElement).focus();
    }

    private onNotifyChange() {
        this.expensesChange.emit(this.expenses);
    }
}
