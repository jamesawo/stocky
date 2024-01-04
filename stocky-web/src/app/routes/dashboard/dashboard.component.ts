import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PassportUsecase} from "../passport/authentication/_usecase/passport.usecase";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
    constructor(private passportUsecase: PassportUsecase) {
    }

    getFullName() {
        return this.passportUsecase.getLoggedInUser()?.username;
    }

}
