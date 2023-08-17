import {InjectionToken} from '@angular/core';

import Rollbar from 'rollbar';
import {environment} from 'src/environments/environment';

const rollbarConfig: Rollbar.Configuration = {
    accessToken: 'b209d23d8c4b459086e4869af05271fe',
    captureUncaught: true,
    captureUnhandledRejections: true,
    captureEmail: true,
    captureIp: true,
    captureUsername: true,
    environment: environment.production ? 'production' : 'development',
    enabled: environment.production,
    ignoredMessages: ['Script error.']
};

export function rollbarFactory() {
    return new Rollbar(rollbarConfig);
}

export const RollbarService = new InjectionToken<Rollbar>('rollbar');
