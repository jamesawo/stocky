import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {firstValueFrom} from 'rxjs';
import {CompanyDetail} from '../../../../../data/constant/company-detail.constant';
import {UtilService} from '../../../../../shared/utils/util.service';
import {CompanySetupPayload} from '../../../_data/company-setup.payload';
import {BasicSetupUsecase} from '../../../_usecase/company-setup/basic-setup.usecase';

@Component({
    selector: 'app-company-basic-form',
    templateUrl: './company-basic-form.component.html',
    styles: []
})
export class CompanyBasicFormComponent implements OnInit {

    public form: FormGroup = this.buildForm;
    public isLoading = false;
    public detailsMap?: any;
    protected readonly getNzFormControlValidStatus = this.util.getNzFormControlValidStatus;

    constructor(
        private fb: FormBuilder,
        private usecase: BasicSetupUsecase,
        private notification: NzNotificationService,
        private util: UtilService
    ) {}

    /**
     * Returns a form group representing the company details form.
     * The form group contains various form controls with initial values and validators.
     *
     * @returns {FormGroup} The build form group.
     */
    public get buildForm() {

        return this.fb.group({

            businessName: [this.getValueFromCompanyBasicDetailsMap(CompanyDetail.COMPANY_BUSINESS_NAME), [Validators.required]],
            businessCategory: [this.getValueFromCompanyBasicDetailsMap(CompanyDetail.COMPANY_BUSINESS_CATEGORY), [Validators.required]],
            businessEmployeeSize: [this.getValueFromCompanyBasicDetailsMap(CompanyDetail.COMPANY_BUSINESS_EMPLOYEE_SIZE), [Validators.required]],
            businessNumberOfYearsOfOperation: [this.getValueFromCompanyBasicDetailsMap(CompanyDetail.COMPANY_BUSINESS_NUMBER_OF_YEARS_OF_OPERATION), [Validators.required]],
            businessNumberOfBranch: [this.getValueFromCompanyBasicDetailsMap(CompanyDetail.COMPANY_BUSINESS_NUMBER_OF_BRANCH), [Validators.required]],
            businessAddress: [this.getValueFromCompanyBasicDetailsMap(CompanyDetail.COMPANY_BUSINESS_ADDRESS), [Validators.required]]

            //todo:: make businessAddress an object of its own
            // businessAddress: this.fb.group({
            //     country: [null],
            //     state: [null],
            //     lga: [null],
            //     city: [null],
            //     street: [null],
            //     postal: [null]
            // })
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
                this.detailsMap = value.body;
                this.form = this.buildForm;
            }
        });
    }


    /**
     * Saves the basic form details.
     *
     * @returns {Promise<void>} A promise that resolves when the basic form details are saved.
     */
    public async onSaveBasicFormDetails() {
        if (this.form.invalid) {
            this.util.markFormFieldsAsDirtyAndTouched(this.form!);
            return;
        }

        this.isLoading = true;
        const detailsList = this.getValuesAsListFromCompanyBasicDetailsForm(this.form!);
        await this.util.handleUsecaseRequest(this.usecase.updateMany(detailsList), this.notification);
        this.isLoading = false;
    }


    /**
     * Retrieves the value from the CompanyBasicDetailsMap based on the given key.
     *
     * @param {string} key - The key to retrieve the value from the CompanyBasicDetailsMap.
     * @returns {string | null} The value corresponding to the given key in the CompanyBasicDetailsMap,
     *                          or null if the key is not found or the CompanyBasicDetailsMap is undefined.
     */
    private getValueFromCompanyBasicDetailsMap(key: string): string | null {
        if (this.detailsMap && this.detailsMap[key]) {
            return this.detailsMap[key];
        }
        return null;
    }


    /**
     * Retrieves the values from the CompanyBasicDetailsForm as a list of CompanyDetailsPayload objects.
     *
     * @param {FormGroup} form - The FormGroup object representing the CompanyBasicDetailsForm.
     * @returns {CompanySetupPayload[]} A list of CompanyDetailsPayload objects containing the key-value pairs
     *                                   from the CompanyBasicDetailsForm.
     */
    private getValuesAsListFromCompanyBasicDetailsForm(form: FormGroup) {
        const companyDetails: CompanySetupPayload[] = [];
        for (let controlsKey in form.controls) {
            companyDetails.push(new CompanySetupPayload(controlsKey, form.controls[controlsKey].value));
        }
        return companyDetails;
    }
}
