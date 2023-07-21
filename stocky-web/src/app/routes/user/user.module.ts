import {NgModule, Type} from '@angular/core';
import {SharedModule} from '@shared';
import {UserRoutingModule} from './user-routing.module';


const COMPONENTS: Array<Type<void>> = [];

@NgModule({
    imports: [SharedModule, UserRoutingModule],
    declarations: COMPONENTS,
    exports: [SharedModule]
})
export class UserModule {
}
