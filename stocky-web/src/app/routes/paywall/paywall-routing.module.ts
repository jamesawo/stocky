import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComingSoonComponent} from '../../shared/components/coming-soon/coming-soon.component';

const routes: Routes = [
    {path: 'plan', component: ComingSoonComponent},
    {path: 'payments', component: ComingSoonComponent},
    {path: 'settings', component: ComingSoonComponent},
    {path: 'billing', component: ComingSoonComponent},
    {path: 'notification', component: ComingSoonComponent}

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaywallRoutingModule {
}
