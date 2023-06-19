import {AsyncPipe, CommonModule, UpperCasePipe} from '@angular/common';
import {NgModule, Type} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DelonACLModule} from '@delon/acl';
import {DelonFormModule} from '@delon/form';
import {AlainThemeModule} from '@delon/theme';
import {NzAutocompleteModule} from 'ng-zorro-antd/auto-complete';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzCalendarModule} from 'ng-zorro-antd/calendar';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzCollapseModule} from 'ng-zorro-antd/collapse';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {NzPopoverModule} from 'ng-zorro-antd/popover';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzResultModule} from 'ng-zorro-antd/result';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {NzUploadModule} from 'ng-zorro-antd/upload';

import {AmountRangeComponent} from './components/amount-range/amount-range.component';
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';
import {BusinessCategoryDropdownComponent} from './components/business-category-dropdown/business-category-dropdown.component';
import {BusinessNumberOfEmployeesComponent} from './components/business-number-of-employees/business-number-of-employees.component';
import {ButtonComponent} from './components/button/button.component';
import {ComingSoonComponent} from './components/coming-soon/coming-soon.component';
import {DatePickerComponent} from './components/date-picker/date-picker.component';
import {ExpandCollapseButtonComponent} from './components/expand-collapse-button/expand-collapse-button.component';
import {ExportUploadButtonComponent} from './components/export-upload-button/export-upload-button.component';
import {FooterButtonComponent} from './components/footer-button/footer-button.component';
import {HintComponent} from './components/hint/hint.component';
import {LoadingCardComponent} from './components/loading-card/loading-card.component';
import {RangeDatePickerComponent} from './components/range-date-picker/range-date-picker.component';
import {RecordStatusBadgeComponent} from './components/record-active-status/record-status-badge.component';
import {SearchResetButtonComponent} from './components/search-reset-button/search-reset-button.component';
import {SearchResultTableComponent} from './components/search-result-table/search-result-table.component';
import {StatusBadgeComponent} from './components/status-badge/status-badge.component';
import {SwitchToggleComponent} from './components/switch-toggle/switch-toggle.component';
import {TableItemEditableComponent} from './components/table-item-editable/table-item-editable.component';
import {TableItemTruncatableComponent} from './components/table-item-truncatable/table-item-truncatable.component';
import {TableItemComponent} from './components/table-item/table-item.component';
import {TableComponent} from './components/table/table.component';
import {TextareaLimitComponent} from './components/textarea-limit/textarea-limit.component';
import {UpdateDeleteActionComponent} from './components/update-delete-action/update-delete-action.component';
import {UploadFileComponent} from './components/upload-file/upload-file.component';
import {DisableAutocompleteDirective} from './directive/disable-autocomplete.directive';

import {SHARED_DELON_MODULES} from './shared-delon.module';
import {SHARED_ZORRO_MODULES} from './shared-zorro.module';

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
    NzPopoverModule,
    NzNotificationModule,
    NzTableModule,
    NzPaginationModule,
    NzPopconfirmModule,
    NzToolTipModule,
    NzCheckboxModule,
    NzAutocompleteModule,
    NzTabsModule,
    NzGridModule,
    NzInputNumberModule,
    NzCollapseModule,
    NzCalendarModule,
    NzDrawerModule,
    NzUploadModule,
    NzEmptyModule,
    NzResultModule,
    NzListModule

];
const COMPONENTS: Array<Type<void>> = [
    DatePickerComponent,
    RangeDatePickerComponent,
    ExpandCollapseButtonComponent,
    ExportUploadButtonComponent,
    SearchResetButtonComponent,
    SearchResultTableComponent,
    SwitchToggleComponent,
    BreadcrumbsComponent,
    ButtonComponent,
    LoadingCardComponent,
    TableComponent,
    HintComponent,
    UpdateDeleteActionComponent,
    TableItemEditableComponent,
    TableItemComponent,
    AmountRangeComponent,
    TextareaLimitComponent,
    UploadFileComponent,
    ComingSoonComponent,
    BusinessCategoryDropdownComponent,
    BusinessNumberOfEmployeesComponent,
    FooterButtonComponent,
    StatusBadgeComponent,
    RecordStatusBadgeComponent,
    TableItemTruncatableComponent
];
const DIRECTIVES: Array<Type<void>> = [
    DisableAutocompleteDirective
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
        // third libs
        ...THIRD_MODULES,
        ...ICONS
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
        ...PROVIDERS
    ],
    providers: [...PROVIDERS]
})
export class SharedModule {
}
