import { Component, OnInit } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Crumbs } from 'src/app/shared/components/breadcrumbs/breadcrumbs.component';

@Component({
    selector: 'app-product-category-list',
    templateUrl: './product-category-list.component.html',
    styleUrls: ['./product-category-list.component.css'],
})
export class ProductCategoryListComponent implements OnInit {
    public isExpanded = true;
    public isLoading = false;
    public isAllChecked = false;
    public indeterminate = false;
    public showModal = false;
    public categoryForm!: UntypedFormGroup;
    public crumbs: Crumbs[] = [
        { link: '/dashboard', title: 'Dashboard' },
        { link: '/products/product-list', title: 'Product' },
        { link: '/products/category-list', title: 'Categories' },
    ];

    constructor(private fb: UntypedFormBuilder) {}

    public ngOnInit(): void {
        this.categoryForm = this.fb.group({
            title: [null, [Validators.required]],
            description: [null],
        });
    }

    public onCheckedAllRecord(checked: boolean) {}

    public onOpenModal = () => {
        this.showModal = true;
    };

    public onCloseModal = () => {
        this.showModal = false;
    };

    public onCreateCategory = () => {
        console.log('saving ..');
        console.log('submit', this.categoryForm.value);
    };
}
