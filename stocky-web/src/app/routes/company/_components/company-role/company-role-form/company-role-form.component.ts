import {HttpResponse} from '@angular/common/http';
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {ModalOrDrawer} from '../../../../../data/payload/common.enum';
import {PopupViewProps} from '../../../../../data/payload/common.types';
import {UtilService} from '../../../../../shared/utils/util.service';
import {PermissionGroupByModulePayload, PermissionPayload, RolePayload} from '../../../_data/company.payload';
import {RoleUsecase} from '../../../_usecase/role.usecase';

@Component({
    selector: 'app-company-role-form',
    templateUrl: './company-role-form.component.html',
    styles: []
})
export class CompanyRoleFormComponent implements OnInit, OnChanges {
    @Input()
    public role?: RolePayload;

    @Input()
    public popup: PopupViewProps = {display: ModalOrDrawer.DRAWER};

    @Output()
    public formActionEmitter = new EventEmitter<HttpResponse<RolePayload>>();

    public form: FormGroup = this.buildRoleForm;
    public permissions = this.usecase.permissions;
    public selectedPermissions: Set<number> = new Set();

    protected readonly getNzFormControlValidStatus = this.util.getNzFormControlValidStatus;

    constructor(
        private usecase: RoleUsecase,
        private notification: NzNotificationService,
        private fb: FormBuilder,
        private util: UtilService
    ) {}

    /**
     * Builds the form for the role, returning a FormGroup instance.
     * The form includes controls for the role's id, name, description, and permissions.
     * @returns The FormGroup instance representing the role form.
     */
    public get buildRoleForm(): FormGroup {
        return this.fb.group({
            id: [this.role?.id, []],
            name: [this.role?.name, [Validators.required]],
            description: [this.role?.description, [Validators.required]],
            permissions: [this.setSelectedPermissionsFromRole(this.role), [Validators.required]]
        });
    }

    /**
     * Indicates whether the current display mode is a drawer.
     * @returns A boolean value indicating if the display mode is a drawer.
     */
    public get isDrawer(): boolean {
        return this.popup.display === ModalOrDrawer.DRAWER;
    }

    public ngOnInit() {
        this.resetFormAndSelectedPermission();
        this.form = this.buildRoleForm;
    }

    public ngOnChanges(changes: SimpleChanges) {}

    /**
     * Handler function for the save action.
     * If the form is invalid, marks form fields as dirty and touched.
     * Otherwise, extracts form values, updates permissions, and triggers the save usecase.
     * Finally, resets the form and handles the response.
     * @returns Promise<void>
     */
    public onSave = async () => {
        if (this.form.invalid) {
            this.util.markFormFieldsAsDirtyAndTouched(this.form);
            return false;
        }
        const form = this.form.value;
        if (this.role && this.role.id) {
            form.id = this.role.id;
        }

        form.permissions = [...this.selectedPermissions].map(id => new PermissionPayload(id));
        const res = await this.util.handleUsecaseRequest(this.usecase.save(form), this.notification);
        this.onResetForm(res);
        return res.ok;
    };

    /** Adds or remove all group permission base on the checkbox checked status from the form.
     * <p>
     *  if the checkbox is checked all the permissions in that group will be added to the selected permission.
     *  if the checkbox is unchecked all the permission will be removed.
     *
     * @param group
     * @param event
     */
    public addOrRemoveAllGroupPermissions(group: PermissionGroupByModulePayload, event: any): void {
        const checked: boolean = event.target.checked;
        if (group && group.permissions) {
            group.permissions.forEach(perm => this.updateSelectedPermission(checked, perm));
        }
        this.updateFormControl();
    }

    /**
     * Handles the selection of a permission and updates the selected permissions accordingly.
     * @param event - The event object triggered by the permission checkbox.
     * @param permission - The permission payload object.
     */
    public handlePermissionSelection(event: any, permission: PermissionPayload): void {
        const checked: boolean = event.target.checked;
        this.updateSelectedPermission(checked, permission);
    }

    /**
     * Checks if all permissions in the given group are checked.
     * @param group - The permission group object.
     * @returns A boolean value indicating if all permissions in the group are checked.
     */
    public areAllGroupPermissionsChecked(group: PermissionGroupByModulePayload): boolean {
        if (group && group.permissions) {
            return group.permissions.every(perm => this.selectedPermissions.has(perm.id!));
        }
        return false;
    }

    /**
     * Checks if there is at least one permission present in both the group's permissions
     * and the Role's permissions.
     * @param group - The permission group object containing permissions (from ui- nz-collapse-panel) .
     * @returns A boolean value indicating if the role has any permission in the group.
     */
    public doesRoleHaveAnyPermissionInGroup(group: PermissionGroupByModulePayload): boolean {
        let booleanFlag = false;
        const permissionsInGroup = group.permissions;

        if (this.role && this.role.permissions && permissionsInGroup) {
            for (let groupPermission of permissionsInGroup) {
                for (let rolePermission of this.role.permissions) {
                    if (groupPermission.id == rolePermission.id) {
                        booleanFlag = true;
                        break;
                    }
                }
            }
        }
        return booleanFlag;
    }

    /**
     * Reset, clears the form and selected permissions
     *
     * @private
     */
    private resetFormAndSelectedPermission() {
        this.form = this.fb.group({});
        this.selectedPermissions = new Set();
    }

    /**
     * Updates the selected permissions based on the checked status of a permission.
     * If the permission is checked, it is added to the selected permissions set.
     * If the permission is unchecked, it is removed from the selected permissions set.
     * Finally, it triggers the update of the form control associated with the selected permissions.
     * @param checked - A boolean value indicating if the permission is checked.
     * @param permission - The permission payload object.
     * @returns void
     */
    private updateSelectedPermission(checked: boolean, permission: PermissionPayload): void {
        if (checked) {
            this.selectedPermissions.add(permission.id!);
        } else {
            this.selectedPermissions.delete(permission.id!);
        }
        this.updateFormControl();
    }

    /**
     * Adds permissions from the role to the selectedPermissions and returns it.
     * @param role - The role containing permissions to add.
     * @returns The Set of selected permissions after adding the role's permissions, or null if role permissions is undefined.
     */
    private setSelectedPermissionsFromRole(role?: RolePayload): Set<number> | null {
        if (role && role.permissions) {
            role.permissions.forEach(permission => {
                if (permission && permission.id) this.selectedPermissions.add(permission.id);
            });
            return this.selectedPermissions;
        }
        return null;
    }

    /**
     * Updates the form control associated with the selected permissions based on the current state of selected permissions.
     * If there are selected permissions, their values are set in the form control.
     * If there are no selected permissions, the form control is set to null and the form control validation will kick in when user tries to submit.
     */
    private updateFormControl() {
        if (this.selectedPermissions.size > 0) {
            this.form.get('permissions')?.setValue(this.selectedPermissions);
        } else {
            this.form.get('permissions')?.setValue(null);
        }
    }

    /**
     * Resets the form and performs additional actions based on the response.
     * If the response is successful (status code 200-299), the form is resetFormAndSelectedPermission, a new role form is built,
     * and the usecase trigger is set to true to indicate a change.
     * The response is emitted via the formActionEmitter event.
     * @param res - The HTTP response containing the role payload.
     */
    private onResetForm(res: HttpResponse<RolePayload>) {
        if (res.ok) {
            this.form.reset();
            this.form = this.buildRoleForm;
            this.usecase.setTrigger(true);
        }
        this.formActionEmitter.emit(res);
    }

}
