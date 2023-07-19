import {Component, HostListener} from '@angular/core';

const enum Status {
    OFF = 0,
    RESIZE = 1,
    MOVE = 2
}


@Component({
    selector: 'app-resizable',
    templateUrl: './resizable.component.html',
    styleUrls: ['./resizable.component.css']
})
export class ResizableComponent {

    x = 50;
    y = 50;
    px = 0;
    py = 0;
    width = 250;
    height = 200;
    draggingCorner = false;
    resizer?: Function;
    status?: Status;

    topLeftResize(offsetX: number, offsetY: number) {
        this.x += offsetX;
        this.y += offsetY;
        this.width -= offsetX;
        this.height -= offsetY;
    }

    topRightResize(offsetX: number, offsetY: number) {
        this.y += offsetY;
        this.width += offsetX;
        this.height -= offsetY;
    }

    bottomLeftResize(offsetX: number, offsetY: number) {
        this.x += offsetX;
        this.width -= offsetX;
        this.height += offsetY;
    }

    bottomRightResize(offsetX: number, offsetY: number) {
        this.width += offsetX;
        this.height += offsetY;
    }

    onCornerClick(event: MouseEvent, resizer?: Function) {
        this.draggingCorner = true;
        this.px = event.clientX;
        this.py = event.clientY;
        this.resizer = resizer;
        this.status = 1;
        event.preventDefault();
        event.stopPropagation();
    }

    @HostListener('document:mousemove', ['$event'])
    onCornerMove(event: MouseEvent) {
        if (!this.draggingCorner) {
            return;
        }

        let offsetX = event.clientX - this.px;
        let offsetY = event.clientY - this.py;

        let lastX = this.x;
        let lastY = this.y;
        let pWidth = this.width;
        let pHeight = this.height;
        console.log(this.status);
        if (this.status === Status.RESIZE) this.resizer!(offsetX, offsetY);
        else if (this.status === Status.MOVE) this.onDrag(offsetX, offsetY);

        // if (this.area() < this.minArea) {
        //     this.x = lastX;
        //     this.y = lastY;
        //     this.width = pWidth;
        //     this.height = pHeight;
        // }
        this.px = event.clientX;
        this.py = event.clientY;
    }

    @HostListener('document:mouseup', ['$event'])
    onCornerRelease(event: MouseEvent) {
        this.draggingCorner = false;
    }

    setStatus(event: MouseEvent, status: number, func?: Function | undefined) {
        // console.log(this.status)

        if (status === 1) {
            this.draggingCorner = true;
            this.px = event.clientX;
            this.py = event.clientY;
            this.resizer = func;
            this.status = 1;
            event.preventDefault();
            event.stopPropagation();
        } else if (status === 2) {
            this.draggingCorner = true;
            this.px = event.clientX;
            this.py = event.clientY;
            this.status = 2;
        }
    }

    onDrag(x: number, y: number) {
        console.log('here');
        this.x = this.x + x;
        this.y = this.y + y;
    }

}
