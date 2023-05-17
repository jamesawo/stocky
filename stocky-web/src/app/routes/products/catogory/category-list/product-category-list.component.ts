import {HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {firstValueFrom, Observable, shareReplay} from 'rxjs';
import {Crumbs} from 'src/app/shared/components/breadcrumbs/breadcrumbs.component';
import {TableCol} from '../../../../shared/components/table/table.component';
import {appendToObservableListIfStatus, handleHttpResponse, isValidateFormControls} from '../../../../shared/utils/util';
import {ProductCategoryPayload} from '../../_data/product.payload';
import {ProductCategoryUsecase} from '../../_usecase/product-category.usecase';

@Component({
    selector: 'app-product-category-list',
    templateUrl: './product-category-list.component.html',
    styleUrls: ['./product-category-list.component.css'],
})
export class ProductCategoryListComponent implements OnInit {
    public isExpanded = true;
    public isLoading = false;
    public isLoadingSearch = false;
    public isAllChecked = false;
    public indeterminate = false;
    public showModal = false;
    public categoryForm!: UntypedFormGroup;
    public crumbs: Crumbs[] = [
        {link: '/dashboard', title: 'Dashboard'},
        {link: '/products/product-list', title: 'Product'},
        {link: '/products/category-list', title: 'Categories'},
    ];

    public categories?: Observable<ProductCategoryPayload[]>;
    public cols: TableCol[] = [{title: 'Title'}, {title: 'Description'}, {title: 'Action'}];

    constructor(private fb: UntypedFormBuilder, private nzNotificationService: NzNotificationService, private usecase: ProductCategoryUsecase) {}

    public ngOnInit(): void {
        this.initForm();
        this.categories = this.usecase.getMany().pipe(shareReplay());
    }

    public initForm() {
        this.categoryForm = this.fb.group({
            title: [null, [Validators.required]],
            description: [null],
        });
    }

    public onOpenModal = () => {
        this.showModal = true;
    };

    public onCloseModal = () => {
        this.showModal = false;
    };

    public onSearchCategory = async () => {};

    public onResetSearch = () => {};

    public onCancelSearch = () => {};

    public onAddCategory = async () => {
        const isInvalid = isValidateFormControls(this.categoryForm);
        if (isInvalid) {
            return;
        }

        this.isLoading = true;
        const category = this.categoryForm.value;
        let promise = firstValueFrom(this.usecase.save(category));
        const response: HttpResponse<ProductCategoryPayload> = await handleHttpResponse(promise, this.nzNotificationService, {
            success: 'Product category added successfully',
        });
        this.categories = appendToObservableListIfStatus(this.categories!, response.body, response.ok);
        this.onResetPayload();
    };

    public onToggleEdit = (id: number) => {
        console.log('Editing...', id);
    };

    private onResetPayload() {
        this.initForm();
        this.isLoading = false;
        this.showModal = false;
    }
}
