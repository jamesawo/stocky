import {SettingModuleEnum} from '../../../data/payload/common.enum';
import {SettingField} from './setting.enum';

export class SettingOption {
    optionLabel?: string;
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
    settingModule?: SettingModuleEnum;
}
