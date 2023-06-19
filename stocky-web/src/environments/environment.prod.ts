import {Environment} from '@delon/theme';

export const environment = {
    production: true,
    useHash: true,
    api: {
        baseUrl: '/api/v1',
        refreshTokenEnabled: true,
        refreshTokenType: 'auth-refresh'
    }
} as Environment;
