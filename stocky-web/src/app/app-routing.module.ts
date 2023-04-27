import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutBaseComponent } from './presenter/components/layouts/layout-base/layout-base.component';
import { LandingComponent } from './presenter/pages/main/landing/landing.component';

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () =>
            import(
                'src/app/presenter/pages/authentication/authentication.module'
            ).then((m) => m.AuthenticationModule),
    },
    {
        path: 'company',
        component: LayoutBaseComponent,
        loadChildren: () =>
            import('src/app/presenter/pages/company/company.module').then(
                (m) => m.CompanyModule
            ),
    },
    {
        path: 'dashboard',
        component: LayoutBaseComponent,
        loadChildren: () =>
            import('src/app/presenter/pages/dashboard/dashboard.module').then(
                (m) => m.DashboardModule
            ),
    },
    {
        path: 'products',
        component: LayoutBaseComponent,
        loadChildren: () =>
            import('src/app/presenter/pages/products/products.module').then(
                (m) => m.ProductsModule
            ),
    },
    {
        path: 'report',
        component: LayoutBaseComponent,
        loadChildren: () =>
            import('src/app/presenter/pages/report/report.module').then(
                (m) => m.ReportModule
            ),
    },
    {
        path: 'sales',
        component: LayoutBaseComponent,
        loadChildren: () =>
            import('src/app/presenter/pages/sales/sales.module').then(
                (m) => m.SalesModule
            ),
    },
    {
        path: 'settings',
        component: LayoutBaseComponent,
        loadChildren: () =>
            import('src/app/presenter/pages/settings/settings.module').then(
                (m) => m.SettingsModule
            ),
    },
    {
        path: 'stock',
        component: LayoutBaseComponent,
        loadChildren: () =>
            import('src/app/presenter/pages/stock/stock.module').then(
                (m) => m.StockModule
            ),
    },
    {
        path: '',
        component: LandingComponent,
        pathMatch: 'full',
        canActivate: [],
    },
    { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            enableTracing: false,
            scrollPositionRestoration: 'enabled',
            useHash: true,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
