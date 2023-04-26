import { NgModule } from '@angular/core';
import { SettingsModule } from './settings/settings.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { MainModule } from './main/main.module';
import { IconsModule } from '../components/icons/icons.module';

@NgModule({
    imports: [IconsModule, SettingsModule, AuthenticationModule, MainModule],
})
export class PagesModule {}
