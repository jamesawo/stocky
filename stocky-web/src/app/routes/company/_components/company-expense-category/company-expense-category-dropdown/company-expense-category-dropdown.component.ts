import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Observable, of, shareReplay} from 'rxjs';
import {CommonPayload} from '../../../../../data/payload/common.payload';
import {FormProps} from '../../../../../data/payload/common.types';
import {ExpenseCategoryUsecase} from '../../../_usecase/company-expenses/expense-category.usecase';

@Component({
    selector: 'app-company-expense-category-dropdown',
    templateUrl: './company-expense-category-dropdown.component.html',
    styles: []
})
export class CompanyExpenseCategoryDropdownComponent implements OnInit {
    @Input()
    public formProps?: FormProps;

    @Input()
    public props: {showLabel: boolean} = {showLabel: false};

    public categories: Observable<CommonPayload[]> = of();

    @Input()
    public select?: CommonPayload;

    @Output()
    public selectChange = new EventEmitter<CommonPayload>();

    constructor(
        private usecase: ExpenseCategoryUsecase,
        private notification: NzNotificationService
    ) {}

    public ngOnInit() {
        this.loadList();
        this.usecase.trigger$.subscribe(value => this.loadList());
    }

    public onCategorySelected(selected: CommonPayload) {
        if (selected) {
            this.selectChange.emit(selected);
        }
    }

    private loadList() {
        this.categories = this.usecase.getAll().pipe(shareReplay());
    }


}
