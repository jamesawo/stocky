import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Observable, shareReplay} from 'rxjs';
import {Crumbs} from 'src/app/shared/components/breadcrumbs/breadcrumbs.component';
import {PRODUCT_CRUMBS} from '../../../../data/constant/crumb.constant';
import {TableCol} from '../../../../shared/components/table/table.component';
import {
    handleAppendToObservableListIfResponse,
    handleFindFromObservableList,
    handleRemoveFromObservableListIfStatus,
    handleUpdateObservableListIfResponse,
    handleUsecaseRequest,
    isValidateFormControls,
} from '../../../../shared/utils/util';
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
    public crumbs: Crumbs[] = PRODUCT_CRUMBS;
    public editObj: {
        [key: string]: {
            deleting: boolean;
            updating: boolean;
            edit: boolean;
            data: ProductCategoryPayload;
        };
    } = {};

    public categories?: Observable<ProductCategoryPayload[]>;
    public cols: TableCol[] = [{title: 'Title'}, {title: 'Description'}, {title: 'Action'}];

    constructor(
        private fb: UntypedFormBuilder,
        private notification: NzNotificationService,
        private usecase: ProductCategoryUsecase
    ) {}

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
        let response = await handleUsecaseRequest(this.usecase.save(category), this.notification);
        this.categories = handleAppendToObservableListIfResponse(this.categories!, response);
        this.onResetPayload();
    };

    public onCancelEdit = async (item: ProductCategoryPayload): Promise<void> => {
        let payload = await handleFindFromObservableList(this.categories!, {key: 'id', value: item.id!});
        this.editObj[item.id!] = {
            data: {...payload},
            edit: false,
            updating: false,
            deleting: false,
        };
    };

    public onToggleEdit = (item: ProductCategoryPayload) => {
        this.editObj[item.id!] = {edit: true, data: {...item}, updating: false, deleting: false};
    };

    public onSaveEdit = async (item: ProductCategoryPayload): Promise<void> => {
        debugger;
        this.editObj[item.id!].updating = true;
        const data = this.editObj[item.id!].data;
        const response = await handleUsecaseRequest(this.usecase.update(data), this.notification);
        this.categories = handleUpdateObservableListIfResponse(this.categories!, response);
        this.editObj[item.id!].edit = false;
    };

    public onConfirmDelete = async (id: number) => {
        this.editObj[id] = {edit: false, data: {}, updating: false, deleting: true};
        const response = await handleUsecaseRequest(this.usecase.delete(id), this.notification);
        this.categories = handleRemoveFromObservableListIfStatus(
            this.categories!,
            {key: 'id', value: id},
            response
        );
        this.editObj[id].deleting = false;
    };

    public onCancelDelete = async () => {};

    private onResetPayload() {
        this.initForm();
        this.isLoading = false;
        this.showModal = false;
    }
}
