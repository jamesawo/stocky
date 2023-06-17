import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {CommonPayload} from '../../../../data/payload/common.payload';
import {CompanySetupPayload} from '../../_data/company-setup.payload';

@Injectable({
    providedIn: 'root'
})
export class BasicSetupUsecase {
    private url = environment.api.baseUrl + '/company/setup/basic';

    constructor(private http: HttpClient) {
    }

    public updateMany(basicDetailList: CompanySetupPayload[]) {
        return this.http.post<boolean>(`${this.url}/update-many`, basicDetailList, {observe: 'response'});
    }

    public updateOne(detailsPayload: CompanySetupPayload) {
        return this.http.put(`${this.url}/update-one`, detailsPayload, {observe: 'response'});
    }

    public getOne() {
        return this.http.get<CompanySetupPayload>(`${this.url}/get-one`);
    }

    public getBusinessCategories() {
        return this.http.get<CommonPayload[]>(`${this.url}/get-business-categories`);
    }

    public getAll() {
        return this.http.get<any>(`${this.url}/get-all`, {observe: 'response'});
    }


}
