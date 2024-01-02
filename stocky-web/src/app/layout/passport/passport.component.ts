import {Component, Inject, OnInit} from '@angular/core';
import {DA_SERVICE_TOKEN, ITokenService} from '@delon/auth';

@Component({
    selector: 'layout-passport',
    templateUrl: './passport.component.html',
    styleUrls: ['./passport.component.less']
})
export class LayoutPassportComponent implements OnInit {
    links = [
        {
            title: 'Support',
            href: ''
        },
        {
            title: 'Documentation',
            href: ''
        },
        {
            title: 'FAQ',
            href: ''
        }
    ];

    constructor(@Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    getYear = () => new Date().getFullYear();

    ngOnInit(): void {
        this.tokenService.clear();
    }
}
