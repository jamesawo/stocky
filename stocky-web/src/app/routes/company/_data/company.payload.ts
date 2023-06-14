import {AppModuleEnum} from '../../../data/payload/common.enum';
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

export class PermissionPayload {
    id?: number;
    name: string = '';
    module?: AppModuleEnum;
    description: string = '';
    checked?: boolean;
}

export class PermissionGroupByModulePayload {
    module?: AppModuleEnum;
    permissions?: PermissionPayload[] = [];
}

export class RolePayload {
    id?: number;
    name?: string;
    description?: string;
    permissions: PermissionPayload[] = [];
    createdAt?: string;
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


export class ExpensesPayload {
    id?: number;
    amount?: number;
    comment?: string;
    fileId?: string;
    user?: UserPayload;
    transactionDate?: string;
}
