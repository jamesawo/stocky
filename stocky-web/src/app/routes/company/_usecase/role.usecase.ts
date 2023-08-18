import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {BehaviorSubject, Observable, shareReplay} from 'rxjs';
import {PermissionGroupByModulePayload, PermissionPayload, RolePayload} from '../_data/company.payload';

@Injectable({providedIn: 'root'})
export class RoleUsecase {
    public trigger: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public trigger$: Observable<boolean> = this.trigger.asObservable();
    public permissions?: Observable<PermissionGroupByModulePayload[]>;
    private url = environment.api.baseUrl + '/auth/role';
    private permissionUrl = environment.api.baseUrl + '/auth/permission';

    constructor(private http: HttpClient) {
        this.loadPermissions();
    }


    public save(payload: RolePayload) {
        if (payload.id) {
            return this.update(payload);
        }

        return this.http.post<RolePayload>(`${this.url}/create`, payload, {observe: 'response'});
    }

    public getAll() {
        return this.http.get<RolePayload[]>(`${this.url}/all`);
    }

    public getOne(id: number) {
        return this.http.get<RolePayload[]>(`${this.url}/find/${id}`, {observe: 'response'});
    }

    public toggleStatus(id: number) {
        return this.http.put<boolean>(`${this.url}/status/${id}`, {}, {observe: 'response'});
    }

    public getRolePermissions(id: number) {
        return this.http.get<PermissionPayload[]>(`${this.url}/find-role-permission/${id}`, {observe: 'response'});
    }

    public update(payload: RolePayload) {
        return this.http.put<RolePayload>(`${this.url}/update`, payload, {observe: 'response'});
    }

    public setTrigger(value: boolean) {
        this.trigger.next(value);
    }

    public getPermissionGroupByModule() {
        return this.http.get<PermissionGroupByModulePayload[]>(`${this.permissionUrl}/all`);
    }

    private loadPermissions() {
        if (!this.permissions) {
            this.permissions = this.getPermissionGroupByModule().pipe(shareReplay());
        }
    }
}
