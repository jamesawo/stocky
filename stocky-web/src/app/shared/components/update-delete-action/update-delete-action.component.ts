import {Component, Input} from '@angular/core';
import {TableButtonEnum} from '../../../data/payload/common.enum';
import {TableActionButtons, TableActionProps} from '../../../data/payload/common.types';


@Component({
    selector: 'app-update-delete-action',
    templateUrl: './update-delete-action.component.html',
    styles: []
})
export class UpdateDeleteActionComponent<T> {
    @Input()
    public props!: TableActionProps<T>;
    @Input()
    public item!: any;
    @Input()
    public buttons?: TableActionButtons[] = [TableButtonEnum.EDIT, TableButtonEnum.DELETE];
    protected readonly TableButtonEnum = TableButtonEnum;
    
    public emptyAction = () => {};


}
