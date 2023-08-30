import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {startPageGuard} from '@core';
import {SimpleGuard} from '@delon/auth';
import {environment} from '@env/environment';
// layout
import {LayoutBasicComponent} from '../layout/basic/basic.component';
import {LayoutPassportComponent} from '../layout/passport/passport.component';
// dashboard pages
import {DashboardComponent} from './dashboard/dashboard.component';
// single pages
import {CallbackComponent} from './passport/callback.component';
import {UserLockComponent} from './passport/lock/lock.component';
// passport pages
import {UserLoginComponent} from './passport/login/login.component';
import {UserRegisterResultComponent} from './passport/register-result/register-result.component';
import {UserRegisterComponent} from './passport/register/register.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutBasicComponent,
        canActivate: [startPageGuard, SimpleGuard],
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: {title: 'Dashboard'}
            },
            {
                path: 'exception',
                loadChildren: () =>
                    import('./exception/exception.module').then(
                        (m) => m.ExceptionModule
                    )
            }
        ]
    },

    {
        path: 'passport',
        component: LayoutPassportComponent,
        children: [
            {
                path: 'login',
                component: UserLoginComponent,
                data: {title: 'Login'}
            },
            {
                path: 'register',
                component: UserRegisterComponent,
                data: {title: 'Register'}
            },
            {
                path: 'register-result',
                component: UserRegisterResultComponent,
                data: {title: 'Register Result'}
            },
            {
                path: 'lock',
                component: UserLockComponent,
                data: {title: 'Lock'}
            }
        ]
    },

    {
        path: 'authentication',
        component: LayoutBasicComponent,
        canActivate: [startPageGuard, SimpleGuard],
        loadChildren: () =>
            import('src/app/routes/passport/authentication/authentication.module').then(
                (m) => m.AuthenticationModule
            )
    },

    {
        path: 'company',
        component: LayoutBasicComponent,
        canActivate: [startPageGuard, SimpleGuard],
        loadChildren: () =>
            import('src/app/routes/company/company.module').then(
                (m) => m.CompanyModule
            )
    },

    {
        path: 'products',
        component: LayoutBasicComponent,
        canActivate: [],
        loadChildren: () =>
            import('src/app/routes/products/products.module').then(
                (m) => m.ProductsModule
            )
    },
    {
        path: 'sales',
        component: LayoutBasicComponent,
        canActivate: [startPageGuard, SimpleGuard],
        loadChildren: () =>
            import('src/app/routes/sales/sales.module').then(
                (m) => m.SalesModule
            )
    },
    {
        path: 'settings',
        component: LayoutBasicComponent,
        canActivate: [startPageGuard, SimpleGuard],
        loadChildren: () =>
            import('src/app/routes/settings/settings.module').then(
                (m) => m.SettingsModule
            )
    },
    {
        path: 'reports',
        component: LayoutBasicComponent,
        canActivate: [startPageGuard, SimpleGuard],
        loadChildren: () =>
            import('src/app/routes/report/report.module').then(
                (m) => m.ReportModule
            )
    },
    {
        path: 'stock',
        component: LayoutBasicComponent,
        canActivate: [startPageGuard, SimpleGuard],
        loadChildren: () =>
            import('src/app/routes/stock/stock.module').then(
                (m) => m.StockModule
            )
    },

    {
        path: 'paywall',
        component: LayoutBasicComponent,
        canActivate: [startPageGuard, SimpleGuard],
        loadChildren: () =>
            import('src/app/routes/paywall/paywall.module').then(
                (m) => m.PaywallModule
            )
    },


    {path: 'passport/callback/:type', component: CallbackComponent},
    {path: '**', redirectTo: 'exception/404'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: environment.useHash,
            scrollPositionRestoration: 'top'
        })
    ],
    exports: [RouterModule]
})
export class RouteRoutingModule {
}
