import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CustomerTagEnum} from '../../../../../../data/payload/common.enum';
import {CommonPayload} from '../../../../../../data/payload/common.payload';
import {FormProps} from '../../../../../../data/payload/common.types';
import {UtilService} from '../../../../../../shared/utils/util.service';

@Component({
    selector: 'app-customer-tag',
    templateUrl: './customer-tag.component.html',
    styles: []
})
export class CustomerTagComponent {

    @Input()
    public formProps?: FormProps;

    public list = this.listOfCustomerTags;

    @Input()
    public props?: {showLabel: boolean} = {showLabel: true};

    @Input()
    public select?: CustomerTagEnum;

    @Output()
    public selectChange = new EventEmitter<CustomerTagEnum>();
    protected readonly getNzFormControlValidStatus = this.util.getNzFormControlValidStatus;

    constructor(private util: UtilService) {}

    private get listOfCustomerTags(): CommonPayload[] {
        return Object.keys(CustomerTagEnum).map((value, index) => {
            return {id: index + 1, title: value};
        });
    }

    ngOnInit() {
    }

    public onSelect(selected: CustomerTagEnum) {
        if (selected) {
            this.selectChange.emit(selected);
        }
    }
}

