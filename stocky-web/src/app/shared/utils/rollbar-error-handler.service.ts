import {ErrorHandler, Inject, Injectable} from '@angular/core';
import Rollbar from 'rollbar';
import {PassportUsecase} from '../../routes/passport/authentication/_usecase/passport.usecase';
import {RollbarService} from './rollbar.service';

@Injectable({
    providedIn: 'root'
})
export class RollbarErrorHandler implements ErrorHandler {

    constructor(
        @Inject(RollbarService) private rollbar: Rollbar,
        private passport: PassportUsecase
    ) {
        const app = this.passport.getAppDetail();

        let codeVersion = app?.version ?? 'v1.0.0';
        this.rollbar.configure({
            codeVersion: codeVersion,
            code_version: codeVersion,
            version: codeVersion
        });
    }

    addPerson() {
        let user = this.passport.getLoggedInUser();
        if (user) {
            this.rollbar.configure({
                payload: {
                    person: {
                        id: `${user.id}`,
                        email: user.email,
                        username: user.username
                    }
                }
            });
        }
    }

    handleError(err: any): void {
        this.addPerson();
        this.rollbar.error(err.originalError || err);
    }
}

