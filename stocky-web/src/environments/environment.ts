import {Environment} from '@delon/theme';

export const environment = {
    production: false,
    useHash: true,
    api: {
        baseUrl: 'http://localhost:8080/api/v1',
        refreshTokenEnabled: true,
        refreshTokenType: 'auth-refresh'
    },
    modules: []
} as Environment;
