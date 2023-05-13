import { Component } from '@angular/core';

@Component({
    selector: 'app-loading-card',
    templateUrl: './loading-card.component.html',
    styles: [
        `
            .card-loading {
                text-align: center;
                background: rgba(0, 0, 0, 0.05);
                border-radius: 4px;
                margin-bottom: 20px;
                padding: 30px 50px;
                margin: 20px 0;
            }
        `,
    ],
})
export class LoadingCardComponent {}
