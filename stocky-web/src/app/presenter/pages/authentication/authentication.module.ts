import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({
    declarations: [LoginComponent],
    imports: [CommonModule, AuthenticationRoutingModule],
})
export class AuthenticationModule {}
