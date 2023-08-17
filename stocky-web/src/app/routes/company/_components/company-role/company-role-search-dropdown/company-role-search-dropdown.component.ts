import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {NzSelectModeType} from 'ng-zorro-antd/select/select.types';
import {map, Observable} from 'rxjs';
import {FormProps, SearchProps} from '../../../../../data/payload/common.types';
import {UtilService} from '../../../../../shared/utils/util.service';
import {RolePayload} from '../../../_data/company.payload';
import {RoleUsecase} from '../../../_usecase/role.usecase';

@Component({
    selector: 'app-company-role-search-dropdown',
    templateUrl: './company-role-search-dropdown.component.html',
    styles: []
})
export class CompanyRoleSearchDropdownComponent {

    @Input()
    public mode: NzSelectModeType = 'default';

    @Input()
    public props: SearchProps = {showLabel: true};

    public isLoading = false;
    public dataList?: Observable<RolePayload[]>;

    @Input()
    class?: string;

    @Input()
    form?: FormProps;

    @Input()
    public value?: RolePayload[] = [];

    @Output()
    public valueChange: EventEmitter<RolePayload[]> = new EventEmitter<RolePayload[]>();

    public selectedControl: FormControl = new FormControl();
    protected readonly getNzFormControlValidStatus = this.util.getNzFormControlValidStatus;

    constructor(private usecase: RoleUsecase, private util: UtilService) {}

    public ngOnInit(): void {
        this.onLoadData();
        this.usecase.trigger$.subscribe((change) => this.onLoadData());
    }

    public onValueChange(value: RolePayload[]) {
        if (value) {
            this.valueChange?.emit(value);
            this.updateFormGroupIfPresent(value);
        }
    }

    public onLoadData(): void {
        this.isLoading = true;
        this.dataList = this.usecase.getAll().pipe(
            map((value) => {
                this.isLoading = false;
                return value;
            })
        );
    }

    public canUseFormGroup() {
        if (this.form) {
            return !!this.form.formGroup && !!this.form.controlName;
        }
        return false;
    }

    private updateFormGroupIfPresent(value: RolePayload[]) {
        if (this.form && this.form.formGroup && this.form.controlName) {
            let control = this.form.controlName;
            this.form.formGroup.get(control)?.setValue(value);
            this.form = {...this.form!};
        }
    }
}
