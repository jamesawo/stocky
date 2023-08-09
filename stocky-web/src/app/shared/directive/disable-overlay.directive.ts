import {Directive, ElementRef, Input, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
    selector: '[disableOverlay]'
})
export class DisableOverlayDirective {

    @Input() disabled: boolean = false;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['disabled']) {
            if (this.disabled) {
                this.addOverlay();
                this.disableInteractions();
            } else {
                this.removeOverlay();
                this.enableInteractions();
            }
        }
    }

    private addOverlay(): void {
        const overlay = this.renderer.createElement('div');
        this.renderer.addClass(overlay, 'disable-overlay');
        this.renderer.appendChild(this.el.nativeElement, overlay);
    }

    private removeOverlay(): void {
        const overlay = this.el.nativeElement.querySelector('.disable-overlay');
        if (overlay) {
            this.renderer.removeChild(this.el.nativeElement, overlay);
        }
    }

    private disableInteractions(): void {
        this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
        this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.6');
        // this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'none');
        this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'relative');
        this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '-1');

    }

    private enableInteractions(): void {
        this.renderer.removeStyle(this.el.nativeElement, 'position');
        this.renderer.removeStyle(this.el.nativeElement, 'opacity');
        this.renderer.removeStyle(this.el.nativeElement, 'pointer-events');
        this.renderer.removeAttribute(this.el.nativeElement, 'tabindex');

    }

}
