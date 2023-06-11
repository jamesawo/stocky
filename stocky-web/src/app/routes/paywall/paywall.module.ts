import {NgModule} from '@angular/core';
import {SharedModule} from '@shared';
import {PaywallRoutingModule} from './paywall-routing.module';

@NgModule({
    imports: [SharedModule, PaywallRoutingModule],
    declarations: [],
    exports: []
})
export class PaywallModule {
}
