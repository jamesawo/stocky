import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutBaseComponent } from './presenter/components/layouts/layout-base/layout-base.component';
import { LoginComponent } from './presenter/pages/authentication/login/login.component';
import { LandingComponent } from './presenter/pages/main/landing/landing.component';

const routes: Routes = [
    {
        path: 'settings',
        component: LayoutBaseComponent,
        loadChildren: () =>
            import('src/app/presenter/pages/settings/settings.module').then(
                (m) => m.SettingsModule
            ),
    },
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: LandingComponent,
        pathMatch: 'full',
        canActivate: [],
    },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
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
