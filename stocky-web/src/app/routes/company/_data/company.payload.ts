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

export class RolePayload {
    id?: number;
    title?: string;
    description?: string;
    permissions?: any[];
}
