import {Component, Input} from '@angular/core';
import {CommonInputProps} from '../../../../data/payload/common.types';

@Component({
    selector: 'app-company-location-add-btn',
    templateUrl: './company-location-add-btn.component.html',
    styles: []
})
export class CompanyLocationAddBtnComponent {

    @Input()
    public props: CommonInputProps = {
        size: 'default',
        title: '',
        icon: 'edit',
        showTable: true,
        showForm: true
    };

    public isVisible = false;

    public showModal = () => (this.isVisible = true);


}
