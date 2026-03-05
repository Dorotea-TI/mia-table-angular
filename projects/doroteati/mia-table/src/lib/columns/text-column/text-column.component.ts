import { Component, OnInit } from '@angular/core';
import { BaseColumnComponent } from '../base-column.component';

@Component({
    selector: 'mia-text-column',
    templateUrl: './text-column.component.html',
    styleUrls: ['./text-column.component.scss'],
    standalone: false
})
export class TextColumnComponent extends BaseColumnComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  getFieldValue(): any {
    const val = super.getFieldValueByKey(this.column.field_key);
    const truncate = this.column?.extra?.truncate;

    if (typeof truncate === 'number' && truncate > 0) {
      const stringValue = val == null ? '' : String(val);
      return stringValue.length > truncate
        ? stringValue.substring(0, truncate - 1).trim() + '...'
        : stringValue;
    }

    return val;
  }
  
}
