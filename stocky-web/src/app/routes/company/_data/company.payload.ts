import {LocationTypeEnum} from './company.enum';

export class CompanyPayload {
}

export class LocationPayload {
    id?: number;
    title?: string;
    type?: LocationTypeEnum;
    description?: string;
    status?: boolean;
}
