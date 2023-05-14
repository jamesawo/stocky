import { SettingField } from './setting.enum';

export class SettingOption {
    optionKey?: string;
    optionValue?: string;
}

export class SettingPayload {
    id?: number;
    settingKey?: string;
    settingValue?: string;
    settingField?: SettingField;
    settingTitle?: string;
    settingOptions?: SettingOption[];
    settingHint?: string;
}
