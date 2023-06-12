import {CommonPayload} from '../../../data/payload/common.payload';

export class CompanySetupPayload {
}

export class CompanyBasicDetailsPayload {
    id?: number;
    businessName?: string;
    businessCategory?: CommonPayload;
    businessEmployeeSize?: CommonPayload;
    businessNumberOfYearsOfOperation?: number;
    businessNumberOfBranch?: number;
    businessAddress?: string;
}
