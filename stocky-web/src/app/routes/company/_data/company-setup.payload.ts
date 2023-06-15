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


export class CompanyAdministratorDetailsPayload {
    id?: number;
    profileName?: string;
    profilePhone?: string;
    profileEmail?: string;
    profilePosition?: string;
}

export class CompanyLocaleDetailsPayload {
    id?: number;
    
    currency?: string;
    language?: string;
    timeZone?: string;
}
