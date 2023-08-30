import {Component, Input} from '@angular/core';
import {RolePayload} from '../../../routes/company/_data/company.payload';

@Component({
    selector: 'app-user-roles',
    templateUrl: './user-roles.component.html',
    styles: []
})
export class UserRolesComponent {

    @Input()
    public roles: RolePayload[] = [];
}
