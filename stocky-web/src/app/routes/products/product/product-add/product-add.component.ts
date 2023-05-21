import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PRODUCT_ADD_CRUMBS} from '../../../../data/constant/crumb.constant';
import {PRODUCT_CREATE_POPOVER} from '../../../../data/constant/message.constant';

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

    @ViewChild('basicTmpl', {static: true})
    public basicTmpl!: TemplateRef<any>;

    @ViewChild('priceTmpl', {static: true})
    public priceTmpl!: TemplateRef<any>;

    @ViewChild('newTmpl', {static: true})
    public newTmpl!: TemplateRef<any>;

    ngOnInit(): void {
        this.tabs = [
            {title: 'BASIC DETAILS', template: this.basicTmpl},
            {title: 'PRICE & TAX', template: this.priceTmpl},
            {title: 'VARIATION', template: this.newTmpl},
        ];
    }

    public onSaveProduct = () => {
        console.log('saving product');
    };

    public onCancelSaveProduct = () => {
        console.log('cancelled saving product');
    };
}
