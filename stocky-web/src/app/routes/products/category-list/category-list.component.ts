import { Component, OnInit } from '@angular/core';
import { Crumbs } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
    public isExpanded = true;
    public isLoading = false;
    public isAllChecked = false;
    public indeterminate = false;
    public showModal = false;

    public crumbs: Crumbs[] = [
        { link: '/dashboard', title: 'Dashboard' },
        { link: '/products/product-list', title: 'Product' },
        { link: '/products/category-list', title: 'Categories' },
    ];
    public categoryForm!: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) {}

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

    ngOnInit(): void {
        this.categoryForm = this.fb.group({
            title: [null, [Validators.required]],
            description: [null],
        });
    }
}
