import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {PageResultPayload, PageSearchPayload} from '../../../data/payload/common.interface';

@Injectable({providedIn: 'root'})
export class ManageStockUsecase {
    private url = environment.api.baseUrl + '/stock';

    constructor(private http: HttpClient) {}

    public save(payload: any) {
        return this.http.post<any>(`${this.url}/create`, payload, {observe: 'response'});
    }

    public search(searchPayload: PageSearchPayload<any>) {
        return this.http.post<PageResultPayload<any>>(`${this.url}/search`, searchPayload, {observe: 'response'});
    }


}
