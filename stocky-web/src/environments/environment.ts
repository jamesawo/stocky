import {DelonMockModule} from '@delon/mock';
import {Environment} from '@delon/theme';

import * as MOCKDATA from '../../_mock';

export const environment = {
    production: false,
    useHash: true,
    api: {
        baseUrl: 'http://localhost:8080/api/v1',
        refreshTokenEnabled: true,
        refreshTokenType: 'auth-refresh',
    },
    modules: [DelonMockModule.forRoot({data: MOCKDATA})],
} as Environment;
