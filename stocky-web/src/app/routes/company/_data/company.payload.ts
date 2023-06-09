import {ProductCategoryPayload} from '../../products/_data/product.payload';
import {RoleUsecase} from '../_usecase/role.usecase';
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

export class UserBasicDetailsPayload {
}

export class UserAccountDetailsPayload {
    id?: number;
    username?: string;
    password?: string;
    role?: RoleUsecase;
}

export class UserEmergencyDetails {
    nokFullName?: string;
    nokPhone?: string;
    nokEmail?: string;
    nokAddress?: string;

}


export class UserPayload {
    id?: number;
    basicDetails?: UserBasicDetailsPayload;
    accountDetails?: UserAccountDetailsPayload;
    emergencyDetails?: UserEmergencyDetails;
}


export class SupplierPayload {
    id?: number;
    fullName?: string;
    businessName?: string;
    phoneNumber?: string;
    email?: string;
    address?: string;
    productCategories: ProductCategoryPayload[] = [];
    date?: string;
    recordedBy?: string;
}
