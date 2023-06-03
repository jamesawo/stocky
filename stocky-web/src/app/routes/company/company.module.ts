import {NgModule, Type} from '@angular/core';
import {SharedModule} from '@shared';
import {CompanyLocationSearchComponent} from './_components/company-location-search/company-location-search.component';
import {CompanyUserSearchComponent} from './_components/company-user-search/company-user-search.component';
import {CompanyRoutingModule} from './company-routing.module';

export const COMPANY_COMPONENTS: Array<Type<void>> = [
    CompanyLocationSearchComponent,
    CompanyUserSearchComponent
];

@NgModule({
    imports: [CompanyRoutingModule, SharedModule],
    declarations: [
        ...COMPANY_COMPONENTS
    ],
    exports: [
        ...COMPANY_COMPONENTS
    ]
})
export class CompanyModule {
}
