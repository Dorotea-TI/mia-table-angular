import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BaseColumnComponent } from '../base-column.component';

@Component({
    selector: 'mia-date-column',
    templateUrl: './date-column.component.html',
    styleUrls: ['./date-column.component.scss'],
    standalone: true,
    imports: [DatePipe]
})
export class DateColumnComponent extends BaseColumnComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
