import { NgModule } from '@angular/core';
import { LandingComponent } from './landing/landing.component';
import { RouterModule } from '@angular/router';
import { EmptyComponent } from './empty/empty.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
    declarations: [LandingComponent, EmptyComponent],
    exports: [LandingComponent, EmptyComponent],
    imports: [MainRoutingModule, RouterModule],
})
export class MainModule {}
