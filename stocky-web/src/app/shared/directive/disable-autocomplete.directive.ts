import {AfterViewInit, Directive, ElementRef} from '@angular/core';


@Directive({
    selector: '[disableAutocomplete]'
})
export class DisableAutocompleteDirective implements AfterViewInit {
    constructor(private elementRef: ElementRef) {}

    get random() {
        return Math.random().toString(36).slice(-6);
    }

    ngAfterViewInit() {
        this.disableAutocompleteForElement();
    }

    private disableAutocompleteForElement() {
        this.elementRef.nativeElement.setAttribute('autocomplete', this.random);
        this.checkThenDisableAutocompleteIfElementIsAFormOrContainer();
    }

    private checkThenDisableAutocompleteIfElementIsAFormOrContainer() {
        const isFormElement = this.elementRef.nativeElement instanceof HTMLFormElement;
        const hasChildren = this.elementRef.nativeElement.children.length > 0;

        if (isFormElement || hasChildren) {
            this.disableAutocompleteForContainer();
        }
    }

    private disableAutocompleteForContainer() {
        const formControlElements = this.elementRef.nativeElement.querySelectorAll(
            'input, select, textarea, nz-select'
        );
        formControlElements.forEach((element: any) => {
            element.setAttribute('autocomplete', this.random);
        });
    }

}
