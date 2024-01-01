import {environment} from "@env/environment";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {SalesReportParams} from "../_data/report.interface";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ReportUsecase {

    private url = environment.api.baseUrl + '/report';

    constructor(private http: HttpClient) {
    }

    public salesReport(payload: SalesReportParams): Observable<ArrayBuffer> {
        return this.http.post(`${this.url}/sales/collection-report`, payload, {responseType: 'arraybuffer'});
    }

}
