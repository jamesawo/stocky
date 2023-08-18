import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {firstValueFrom} from 'rxjs';
import {CompanyDetail} from '../../../../../data/constant/company-detail.constant';
import {UtilService} from '../../../../../shared/utils/util.service';
import {CompanySetupPayload} from '../../../_data/company-setup.payload';
import {RegionLocaleUsecase} from '../../../_usecase/company-setup/region-locale.usecase';

@Component({
    selector: 'app-company-region-form',
    templateUrl: './company-region-form.component.html',
    styles: []
})
export class CompanyRegionFormComponent {

    public form: FormGroup = this.buildForm;
    public isLoading = false;
    public adminDetailsMap?: any;
    protected readonly getNzFormControlValidStatus = this.util.getNzFormControlValidStatus;

    constructor(
        private fb: FormBuilder,
        private usecase: RegionLocaleUsecase,
        private notification: NzNotificationService,
        private util: UtilService
    ) {}

    /**
     * Returns a form group representing the company administrators details form.
     * The form group contains various form controls with initial values and validators.
     *
     * @returns {FormGroup} The build form group.
     */
    public get buildForm() {

        return this.fb.group({
            regionLanguage: [this.getValueFromCompanyRegionDetailsMap(CompanyDetail.COMPANY_LOCALE_LANGUAGE), [Validators.required]],
            regionCurrency: [this.getValueFromCompanyRegionDetailsMap(CompanyDetail.COMPANY_LOCALE_CURRENCY), [Validators.required]],
            regionTimeZone: [this.getValueFromCompanyRegionDetailsMap(CompanyDetail.COMPANY_LOCALE_TIME_ZONE), [Validators.required]]
        });
    }


    /**
     * Initializes the component during its lifecycle.
     * Retrieves data from the usecase  and assigns the retrieved values to the component detailMap property.
     *
     * @returns {Promise<void>} A promise that resolves when the component is initialized.
     */
    public async ngOnInit(): Promise<void> {
        firstValueFrom(this.usecase.getAll()).then(value => {
            if (value.ok) {
                this.adminDetailsMap = value.body;
                this.form = this.buildForm;
            }
        });
    }


    /**
     * Saves the administrator form details.
     *
     * @returns {Promise<void>} A promise that resolves when the basic form details are saved.
     */
    public async onSaveFormDetails() {
        if (this.form.invalid) {
            this.util.markFormFieldsAsDirtyAndTouched(this.form!);
            return;
        }

        this.isLoading = true;
        const detailsList = this.getAListOfFormControlKeyAndValueInFormGroup(this.form!);
        await this.util.handleUsecaseRequest(this.usecase.updateMany(detailsList), this.notification);
        this.isLoading = false;
        this.storeInLocalStorage(detailsList);
    }


    /**
     * Retrieves the value from the CompanyRegionSetupMap based on the given key.
     *
     * @param {string} key - The key to retrieve the value from the CompanyRegionSetupMap.
     * @returns {string | null} The value corresponding to the given key in the CompanyRegionSetupMap,
     *                          or null if the key is not found or the CompanyRegionSetupMap is undefined.
     */
    private getValueFromCompanyRegionDetailsMap(key: string): string | null {
        if (this.adminDetailsMap && this.adminDetailsMap[key]) {
            return this.adminDetailsMap[key];
        }
        return null;
    }


    /**
     * Retrieves the values from the CompanyBasicDetailsForm as a list of CompanySetupPayload objects.
     *
     * @param {FormGroup} form - The FormGroup object representing the CompanyBasicDetailsForm.
     * @returns {CompanySetupPayload[]} A list of CompanySetupPayload objects containing the key-value pairs
     *                                   from the CompanyBasicDetailsForm.
     */
    private getAListOfFormControlKeyAndValueInFormGroup(form: FormGroup) {
        const companyDetails: CompanySetupPayload[] = [];
        for (let controlsKey in form.controls) {
            companyDetails.push(new CompanySetupPayload(controlsKey, form.controls[controlsKey].value));
        }
        return companyDetails;
    }

    private storeInLocalStorage(detailsList: CompanySetupPayload[]) {
        detailsList.forEach(value => this.util.storeInLocal(value.setupKey!, value.setupValue));
    }

}
