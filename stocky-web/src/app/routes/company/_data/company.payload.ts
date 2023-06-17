import {AmountRangeParam, DateRangeParam} from '../../../data/param/common.param';
import {AppModuleEnum} from '../../../data/payload/common.enum';
import {CommonPayload} from '../../../data/payload/common.payload';
import {ProductCategoryPayload} from '../../products/_data/product.payload';
import {RoleUsecase} from '../_usecase/role.usecase';
import {LocationTypeEnum} from './company.enum';

export class CompanyPayload {
}

export class LocationTypePayload {
    id?: number;
    title?: string;
    type?: LocationTypeEnum;
}

export class LocationPayload {
    id?: number;
    title?: string;
    type?: LocationTypeEnum;
    description?: string;
    isActiveStatus?: boolean;
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
    category?: CommonPayload;
    amount?: number;
    comment?: string;
    date?: string;
    isActiveStatus?: boolean;
    isRecentlyUpdated?: boolean;
    isPendingApproval?: boolean;
    registeredBy?: string;
    approvedBy?: string;
    uploads?: string;
}

export class ExpensesSearchPayload {
    id?: number;
    category?: CommonPayload;
    registeredBy?: string;
    approvedBy?: string;
    amountRange: AmountRangeParam = new AmountRangeParam();
    fixedAmount?: number;
    dateRangeParam: DateRangeParam = new DateRangeParam();
    isActiveStatus?: boolean;
}

