import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzSelectOptionInterface} from 'ng-zorro-antd/select';
import {Observable, of, shareReplay} from 'rxjs';
import {CommonPayload} from '../../../data/payload/common.payload';
import {FormProps} from '../../../data/payload/common.types';
import {BasicSetupUsecase} from '../../../routes/company/_usecase/company-setup/basic-setup.usecase';
import {UtilService} from '../../utils/util.service';


@Component({
    selector: 'app-business-category-dropdown',
    templateUrl: './business-category-dropdown.component.html',
    styles: []
})
export class BusinessCategoryDropdownComponent implements OnInit {

    @Input() public formProps?: FormProps;

    @Input() public value?: CommonPayload | NzSelectOptionInterface;

    @Output()
    public valueChange = new EventEmitter<CommonPayload | NzSelectOptionInterface>();

    public businessCategories: Observable<CommonPayload[]> = of([]);
    protected readonly getNzFormControlValidStatus = this.util.getNzFormControlValidStatus;

    constructor(private usecase: BasicSetupUsecase, private util: UtilService) {}

    public ngOnInit() {
        this.businessCategories = this.usecase.getBusinessCategories().pipe(shareReplay());
    }

    public onModelChange(selected: CommonPayload | NzSelectOptionInterface) {
        if (selected) {
            this.valueChange.emit(selected);
        }
    }
}
