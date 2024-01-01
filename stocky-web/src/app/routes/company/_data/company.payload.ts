import {AmountRangeParam, DateRangeParam} from '../../../data/param/common.param';
import {AppModuleEnum, CustomerTagEnum} from '../../../data/payload/common.enum';
import {CommonPayload} from '../../../data/payload/common.payload';
import {ProductCategoryPayload, ProductPayload} from '../../products/_data/product.payload';
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

    constructor(id?: number) {
        this.id = id;
    }
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
    isActiveStatus?: boolean;

    constructor(id?: number) {
        this.id = id;
    }
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

    constructor(id?: number, username?: string) {
        this.id = id;
    }
}

export class SupplierPayload {
    id?: number;
    supplierFirstName?: string;
    supplierLastName?: string;
    supplierBusinessName?: string;
    supplierPhone?: string;
    supplierEmailAddress?: string;
    supplierOfficeAddress?: string;
    categories: ProductCategoryPayload[] = [];
    registeredBy?: string;
    isActiveStatus?: boolean;
    createdAt?: string;
}

export class SupplierSearchPayload {
    supplierFullName?: string;
    supplierPhoneNumber?: string;
    supplierEmail?: string;
    dateRangeParam?: DateRangeParam;
    categories: ProductCategoryPayload[] = [];
    createdAt?: string;
    registeredBy?: string;
    isActiveStatus?: boolean;
}

export class ExpensesPayload {
    id?: number;
    category?: CommonPayload;
    amount?: number;
    comment?: string;
    recordDate?: string;
    isActiveStatus?: boolean;
    isRecentlyUpdated?: boolean;
    isPendingApproval?: boolean;
    registeredBy?: string;
    approvedBy?: string;
    uploads?: string;
    createdAt?: string;
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

export class EmployeePayload {
    id?: number;
    personalDetail = new EmployeePersonalDetailPayload();
    nokDetail = new EmployeeNokPayload();
    accountDetail = new EmployeeUserAccountPayload();
    createdAt?: string;
    isActiveStatus?: boolean;

}

export class EmployeePersonalDetailPayload {
    employeeFirstName?: string;
    employeeLastName?: string;
    employeeEmail?: string;
    employeePhone?: string;
    employeeAddress?: string;
    employeeDateOfBirth?: string;
}

export class EmployeeNokPayload {
    nokFullName?: string;
    nokAddress?: string;
    nokEmail?: string;
    nokPhone?: string;
    nokRelationship?: string;
}

export class EmployeeUserAccountPayload {
    id?: number;
    username?: string;
    password?: string;
    roles?: RolePayload;
    expirationDate?: string;
    isActiveStatus?: boolean;

}

export class EmployeeSearchPayload {
    employeeFullName?: string;
    employeePhoneNumber?: string;
    employeeEmail?: string;
    dateRangeParam?: DateRangeParam;
    roles?: RolePayload[];
    expirationDate?: string;
    createdAt?: string;
    registeredBy?: string;
    isActiveStatus?: boolean;
    role?: RolePayload;

    hasAtLeastOneAccountProps = () => {
        return !!this.employeeFullName || !!this.employeePhoneNumber || !!this.employeeEmail || !!this.role;
    };
}

export class CustomerPayload {
    id?: number;
    customerFirstName?: string;
    customerLastName?: string;
    customerEmail?: string;
    customerPhone?: string;
    customerAddress?: string;
    customerTag?: string = CustomerTagEnum.NEW;
    isActiveStatus?: boolean;
}

export class CustomerSearchPayload {
    customerFullName?: string;
    customerPhoneNumber?: string;
    customerEmail?: string;
    dateRangeParam?: DateRangeParam;
    customerTag?: CustomerTagEnum;
    productCategoryRequest?: ProductCategoryPayload;
    productRequest?: ProductPayload;
    promotion?: string;
    registeredBy?: string;
}
