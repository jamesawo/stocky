import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-result-table',
  templateUrl: './search-result-table.component.html',
  styles: [
  ]
})
export class SearchResultTableComponent implements OnInit {
    tableData: any[] = [];
    allInCurrentPageChecked: any;
    indeterminate: any;

  constructor() { }

  ngOnInit(): void {
  }

    onCurrentPageDataChange($event: any[]) {
        
    }

    onAllChecked($event: boolean) {
        
    }
}
