import {AsyncPipe, CommonModule, UpperCasePipe} from '@angular/common';
import {NgModule, Type} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DelonACLModule} from '@delon/acl';
import {DelonFormModule} from '@delon/form';
import {AlainThemeModule} from '@delon/theme';
import {DisableAutocompleteDirective} from './directive/disable-autocomplete.directive';
import {DisableOverlayDirective} from './directive/disable-overlay.directive';
import {SHARED_COMPONENTS} from './shared-components.module';
import {SHARED_DELON_MODULES} from './shared-delon.module';
import {SHARED_ZORRO_MODULES} from './shared-zorro.module';

const DIRECTIVES: Array<Type<void>> = [
    DisableAutocompleteDirective,
    DisableOverlayDirective
];
const ICONS: Array<Type<void>> = [];

const PROVIDERS: Array<Type<void>> = [AsyncPipe, UpperCasePipe];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        AlainThemeModule.forChild(),
        DelonACLModule,
        DelonFormModule,
        ...SHARED_DELON_MODULES,
        ...SHARED_ZORRO_MODULES,
        ...ICONS
    ],
    declarations: [
        ...SHARED_COMPONENTS,
        ...DIRECTIVES
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AlainThemeModule,
        DelonACLModule,
        DelonFormModule,
        ...SHARED_DELON_MODULES,
        ...SHARED_ZORRO_MODULES,
        ...SHARED_COMPONENTS,
        ...DIRECTIVES,
        ...PROVIDERS
    ],
    providers: [...PROVIDERS]
})
export class SharedModule {
}
