import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';
import { AccordionParentComponent } from './accordion-parent/accordion-parent.component';

@NgModule({
    declarations: [AccordionItemComponent, AccordionParentComponent],
    exports: [AccordionItemComponent, AccordionParentComponent],
})
export class CommonComponentModule {}
