import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {CompanySetupPayload} from '../../_data/company-setup.payload';

@Injectable({
    providedIn: 'root'
})
export class RegionLocaleUsecase {

    private url = environment.api.baseUrl + '/company/setup/region';

    constructor(private http: HttpClient) {
    }

    public updateMany(details: CompanySetupPayload[]) {
        return this.http.post<boolean>(`${this.url}/update-many`, details, {observe: 'response'});
    }

    public getAll() {
        return this.http.get<any>(`${this.url}/get-all`, {observe: 'response'});
    }


}
