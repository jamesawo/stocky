import {NgModule, Type} from '@angular/core';
import {SharedModule} from '@shared';
import {CompanyModule} from './company/company.module';
// dashboard pages
import {DashboardComponent} from './dashboard/dashboard.component';
// single pages
import {CallbackComponent} from './passport/callback.component';
import {UserLockComponent} from './passport/lock/lock.component';
// passport pages
import {UserLoginComponent} from './passport/login/login.component';
import {UserRegisterResultComponent} from './passport/register-result/register-result.component';
import {UserRegisterComponent} from './passport/register/register.component';
import {ProductsModule} from './products/products.module';
import {RouteRoutingModule} from './routes-routing.module';

const COMPONENTS: Array<Type<void>> = [
    DashboardComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserRegisterResultComponent,
    CallbackComponent,
    UserLockComponent
];

@NgModule({
    imports: [SharedModule, RouteRoutingModule, ProductsModule, CompanyModule],
    declarations: COMPONENTS,
    exports: [SharedModule]
})
export class RoutesModule {
}
