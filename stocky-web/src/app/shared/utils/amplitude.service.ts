import * as amplitude from '@amplitude/analytics-browser';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';


@Injectable({
    providedIn: 'root'
})
@Injectable()
export class AmplitudeService {
    
    constructor() {
        if (environment.production) {
            amplitude.init('90b7a2838a65c40db5f66fa20fcc2737');
        }
    }
}
