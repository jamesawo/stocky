import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NzSelectOptionInterface} from 'ng-zorro-antd/select';
import {CommonPayload} from '../../../data/payload/common.payload';
import {FormProps} from '../../../data/payload/common.types';
import {UtilService} from '../../utils/util.service';

const numberOfEmployees: CommonPayload[] = [
    {id: 1, title: '0 - 5'},
    {id: 2, title: '6 - 20'},
    {id: 3, title: '21 - 50'},
    {id: 4, title: 'Above 50'}
];

@Component({
    selector: 'app-business-number-of-employees',
    templateUrl: './business-number-of-employees.component.html',
    styles: []
})
export class BusinessNumberOfEmployeesComponent {

    @Input() public formProps?: FormProps;

    @Input() public value?: CommonPayload | NzSelectOptionInterface;

    @Output()
    public valueChange = new EventEmitter<CommonPayload | NzSelectOptionInterface>();

    public list = numberOfEmployees;
    protected readonly getNzFormControlValidStatus = this.util.getNzFormControlValidStatus;

    constructor(private util: UtilService) {}


    public onModelChange(selected: CommonPayload | NzSelectOptionInterface) {
        if (selected) {
            this.valueChange.emit(selected);
        }
    }
}
