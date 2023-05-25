import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PRODUCT_ADD_CRUMBS} from '../../../../data/constant/crumb.constant';
import {PRODUCT_CREATE_POPOVER} from '../../../../data/constant/message.constant';
import {ProductPayload} from '../../_data/product.payload';

@Component({
    selector: 'app-product-add',
    templateUrl: './product-add.component.html',
    styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
    public startPoint = 0;
    public tabs?: {title: string; template: TemplateRef<any>}[];
    public showPageHeader = false;
    public crumbs = PRODUCT_ADD_CRUMBS;
    public popover = PRODUCT_CREATE_POPOVER;
    public form: FormGroup = this.fb.group({
        id: [null],
        productCategory: [null, [Validators.required]],
        unitOfMeasure: [null, [Validators.required]],
        status: [null, [Validators.required]],
        isActive: [true, [Validators.required]],
        useQuantity: [false, [Validators.required]],
        isService: [false, [Validators.required]],
        minAgeLimit: [13],
        productName: [null, [Validators.required]],
        brandName: [null],
        sku: [null],
        barcode: [null],
        description: [null],
        price: [null],
    });

    @ViewChild('basicTmpl', {static: true})
    public basicTmpl!: TemplateRef<any>;

    @ViewChild('priceTmpl', {static: true})
    public priceTmpl!: TemplateRef<any>;

    @ViewChild('newTmpl', {static: true})
    public newTmpl!: TemplateRef<any>;

    constructor(private fb: FormBuilder) {}

    public ngOnInit(): void {
        this.tabs = [
            {title: 'BASIC DETAILS', template: this.basicTmpl},
            {title: 'PRICE & TAX', template: this.priceTmpl},
        ];
    }

    public onSaveProduct = () => {
        console.log('saving product');
        console.log(this.form.value);
    };

    public onCancelSaveProduct = () => {
        console.log('cancelled saving product');
    };
}
