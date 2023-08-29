import {RolePayload} from '../../../company/_data/company.payload';

export class AccountSearchPayload {
    searchTerm?: string;
    role?: RolePayload;

    hasAtLeastOneSearchProperty = () => {
        return !!this.searchTerm || !!this.role;
    };

}

export class AccountPayload {
    name?: string;
    username?: string;
    password?: string;
    expiryDate?: string;
}
