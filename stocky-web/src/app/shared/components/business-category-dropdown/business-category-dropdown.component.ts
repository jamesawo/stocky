import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NzSelectOptionInterface} from 'ng-zorro-antd/select';
import {CommonPayload} from '../../../data/payload/common.payload';
import {FormProps} from '../../../data/payload/common.types';


const businessIndustryTypes: CommonPayload[] = [
    {id: 1, title: 'Beauty Salon'},
    {id: 2, title: 'Bakery'},
    {id: 3, title: 'Supermarket'},
    {id: 4, title: 'Restaurant'},
    {id: 5, title: 'Clothing Store'},
    {id: 6, title: 'Pharmacy'},
    {id: 7, title: 'Hardware Store'},
    {id: 8, title: 'Jewelry Store'},
    {id: 9, title: 'Fitness Center'},
    {id: 10, title: 'Electronics Store'},
    {id: 11, title: 'Bookstore'},
    {id: 12, title: 'Coffee Shop'},
    {id: 13, title: 'Pet Store'},
    {id: 14, title: 'Toy Store'},
    {id: 15, title: 'Music Store'},
    {id: 16, title: 'Home Decor Store'},
    {id: 17, title: 'Garden Center'},
    {id: 18, title: 'Auto Repair Shop'},
    {id: 19, title: 'Dental Clinic'},
    {id: 20, title: 'Gift Shop'},
    {id: 21, title: 'Tyre Store'},
    {id: 22, title: 'Other'}
];

@Component({
    selector: 'app-business-category-dropdown',
    templateUrl: './business-category-dropdown.component.html',
    styles: []
})
export class BusinessCategoryDropdownComponent {

    @Input() public formProps?: FormProps;

    @Input() public value?: CommonPayload | NzSelectOptionInterface;

    @Output()
    public valueChange = new EventEmitter<CommonPayload | NzSelectOptionInterface>();

    public list = businessIndustryTypes.map(item => { return {'label': item.title!, 'value': item}; });


    public onModelChange(selected: CommonPayload | NzSelectOptionInterface) {
        if (selected) {
            this.valueChange.emit(selected);
        }
    }
}
