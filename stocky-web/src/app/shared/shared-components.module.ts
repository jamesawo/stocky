import {Type} from '@angular/core';
import {StockItemPriceFormComponent} from '../routes/stock/_components/stock-manage/stock-item-price-form/stock-item-price-form.component';
import {AmountCurrencyComponent} from './components/amount-currency/amount-currency.component';
import {AmountRangeComponent} from './components/amount-range/amount-range.component';
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';
import {BusinessCategoryDropdownComponent} from './components/business-category-dropdown/business-category-dropdown.component';
import {BusinessNumberOfEmployeesComponent} from './components/business-number-of-employees/business-number-of-employees.component';
import {ButtonComponent} from './components/button/button.component';
import {ComingSoonTextComponent} from './components/coming-soon-text/coming-soon-text.component';
import {ComingSoonComponent} from './components/coming-soon/coming-soon.component';
import {DatePickerComponent} from './components/date-picker/date-picker.component';
import {ExpandCollapseButtonComponent} from './components/expand-collapse-button/expand-collapse-button.component';
import {ExportUploadButtonComponent} from './components/export-upload-button/export-upload-button.component';
import {FieldsetComponent} from './components/fieldset/fieldset.component';
import {FooterButtonComponent} from './components/footer-button/footer-button.component';
import {HintComponent} from './components/hint/hint.component';
import {IconButtonComponent} from './components/icon-button/icon-button.component';
import {LoadingCardComponent} from './components/loading-card/loading-card.component';
import {NothingFoundComponent} from './components/nothing-found/nothing-found.component';
import {PageAlertComponent} from './components/page-alert/page-alert.component';
import {PasswordInputComponent} from './components/password-input/password-input.component';
import {RangeDatePickerComponent} from './components/range-date-picker/range-date-picker.component';
import {RecordStatusBadgeComponent} from './components/record-active-status/record-status-badge.component';
import {ResizableComponent} from './components/resizable/resizable.component';
import {SearchModelDropdownComponent} from './components/search-model-dropdown/search-model-dropdown.component';
import {SearchResetButtonComponent} from './components/search-reset-button/search-reset-button.component';
import {SearchResultTableComponent} from './components/search-result-table/search-result-table.component';
import {SettingLockerComponent} from './components/setting-locker/setting-locker.component';
import {SimpleButtonComponent} from './components/simple-button/simple-button.component';
import {StatusBadgeComponent} from './components/status-badge/status-badge.component';
import {SwitchToggleComponent} from './components/switch-toggle/switch-toggle.component';
import {TableItemEditableComponent} from './components/table-item-editable/table-item-editable.component';
import {TableItemTruncatableComponent} from './components/table-item-truncatable/table-item-truncatable.component';
import {TableItemComponent} from './components/table-item/table-item.component';
import {TableComponent} from './components/table/table.component';
import {TextareaLimitComponent} from './components/textarea-limit/textarea-limit.component';
import {UpdateDeleteActionComponent} from './components/update-delete-action/update-delete-action.component';
import {UploadFileComponent} from './components/upload-file/upload-file.component';
import {UserRolesComponent} from './components/user-roles/user-roles.component';

export const SHARED_COMPONENTS: Array<Type<void>> = [
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
    TableItemTruncatableComponent,
    SearchModelDropdownComponent,
    FieldsetComponent,
    AmountCurrencyComponent,
    IconButtonComponent,
    StockItemPriceFormComponent,
    ResizableComponent,
    SimpleButtonComponent,
    NothingFoundComponent,
    ComingSoonTextComponent,
    PasswordInputComponent,
    SettingLockerComponent,
    PageAlertComponent,
    UserRolesComponent
];
