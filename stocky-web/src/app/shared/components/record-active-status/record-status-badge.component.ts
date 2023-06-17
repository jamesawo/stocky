import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-record-status-badge',
    templateUrl: './record-status-badge.component.html',
    styles: [
        `
          .status-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
          }

          .active {
            background-color: #56a356;
            color: white;
          }

          .inactive {
            background-color: #ed6363;
            color: white;
          }


        `
    ]
})
export class RecordStatusBadgeComponent {

    @Input()
    public status?: boolean;

}
