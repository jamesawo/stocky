import { NgModule, Type } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlainThemeModule } from '@delon/theme';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';

import { SHARED_DELON_MODULES } from './shared-delon.module';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { RangeDatePickerComponent } from './components/range-date-picker/range-date-picker.component';
import { ExpandCollapseButtonComponent } from './components/expand-collapse-button/expand-collapse-button.component';
import { ExportUploadButtonComponent } from './components/export-upload-button/export-upload-button.component';
import { SearchResetButtonComponent } from './components/search-reset-button/search-reset-button.component';
import { SearchResultTableComponent } from './components/search-result-table/search-result-table.component';
import { StatusBadgeComponent } from './components/status-badge/status-badge.component';
import { SwitchToggleComponent } from './components/switch-toggle/switch-toggle.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ButtonComponent } from './components/button/button.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { LoadingCardComponent } from './components/loading-card/loading-card.component';

const THIRD_MODULES: Array<Type<void>> = [
    NzBreadCrumbModule,
    NzDatePickerModule,
    NzSwitchModule,
    NzBadgeModule,
    NzSpaceModule,
    NzModalModule,
    NzFormModule,
    NzRadioModule,
    NzInputModule,
    NzSelectModule,
    NzSpinModule,
    NzDividerModule,
    NzTypographyModule,
];
const COMPONENTS: Array<Type<void>> = [
    DatePickerComponent,
    RangeDatePickerComponent,
    ExpandCollapseButtonComponent,
    ExportUploadButtonComponent,
    SearchResetButtonComponent,
    SearchResultTableComponent,
    StatusBadgeComponent,
    SwitchToggleComponent,
    BreadcrumbsComponent,
    ButtonComponent,
    LoadingCardComponent,
];
const DIRECTIVES: Array<Type<void>> = [];
const ICONS: Array<Type<void>> = [];
const PROVIDERS: Array<Type<void>> = [AsyncPipe];

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
        // third libs
        ...THIRD_MODULES,
        ...ICONS,
    ],
    declarations: [...COMPONENTS, ...DIRECTIVES],
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
        ...THIRD_MODULES,
        ...COMPONENTS,
        ...DIRECTIVES,
    ],
    providers: [...PROVIDERS],
})
export class SharedModule {}
