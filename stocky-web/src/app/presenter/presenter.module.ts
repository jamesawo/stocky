import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { ComponentModule } from './components/components.module';

@NgModule({
    imports: [PagesModule, ComponentModule],
    exports: [PagesModule, ComponentModule],
})
export class PresenterModule {}
