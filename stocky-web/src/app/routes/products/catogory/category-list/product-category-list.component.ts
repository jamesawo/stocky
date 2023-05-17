import {HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {firstValueFrom, Observable, shareReplay} from 'rxjs';
import {Crumbs} from 'src/app/shared/components/breadcrumbs/breadcrumbs.component';
import {PRODUCT_CRUMBS} from '../../../../data/constant/crumb.constant';
import {MessageConstant} from '../../../../data/constant/message.constant';
import {TableCol} from '../../../../shared/components/table/table.component';
import {
    appendToObservableListIfResponseIsOk,
    findFromObservableList,
    handleHttpResponse,
    isValidateFormControls,
    updateObservableListIfStatus,
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
        [key: string]: {loading: boolean; edit: boolean; data: ProductCategoryPayload};
    } = {};

    public categories?: Observable<ProductCategoryPayload[]>;
    public cols: TableCol[] = [{title: 'Title'}, {title: 'Description'}, {title: 'Action'}];

    constructor(
        private fb: UntypedFormBuilder,
        private nzNotificationService: NzNotificationService,
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

        let promise = firstValueFrom(this.usecase.save(category));
        const response: HttpResponse<ProductCategoryPayload> = await handleHttpResponse(
            promise,
            this.nzNotificationService,
            {success: MessageConstant.CATEGORY_SAVED}
        );
        this.categories = appendToObservableListIfResponseIsOk(this.categories!, response);
        this.onResetPayload();
    };

    public onCancelEdit = async (item: ProductCategoryPayload): Promise<void> => {
        let payload = await findFromObservableList(this.categories!, {key: 'id', value: item.id!});
        this.editObj[item.id!] = {
            data: {...payload},
            edit: false,
            loading: false,
        };
    };

    public onToggleEdit = (item: ProductCategoryPayload) => {
        this.editObj[item.id!] = {edit: true, data: {...item}, loading: false};
    };

    public onSaveEdit = async (item: ProductCategoryPayload): Promise<void> => {
        this.editObj[item.id!].loading = true;
        let promise = firstValueFrom(this.usecase.update(this.editObj[item.id!].data));
        const response = await handleHttpResponse(promise, this.nzNotificationService);
        this.categories = updateObservableListIfStatus(this.categories!, response.body, response.ok);
        this.editObj[item.id!].edit = false;
    };

    private onResetPayload() {
        this.initForm();
        this.isLoading = false;
        this.showModal = false;
    }
}
