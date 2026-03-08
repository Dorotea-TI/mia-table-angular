import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseEditableColumnComponent } from '../base-editable-column.component';
import moment from 'moment';

@Component({
    selector: 'mia-date-editable-column',
    templateUrl: './date-editable-column.component.html',
    styleUrls: ['./date-editable-column.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule]
})
export class DateEditableColumnComponent extends BaseEditableColumnComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.createFormControl();
  }

  createFormControl() {
    // Get value
    let value = this.getFieldValueByKey(this.column.field_key);
    // Create Control
    this.input = new FormControl(moment(value, 'YYYY-MM-DD hh:mm:ss'));
    // Config listening
    this.input.valueChanges.subscribe((val: any) => {
      // Convert to String
      if(val != undefined && val != null){
        let result = val.format('YYYY-MM-DD hh:mm:ss');
        this.setFieldValueByKey(this.column.field_key, result);
      } else {
        this.setFieldValueByKey(this.column.field_key, '');
      }
      if(this.configEdit?.subject){
        this.configEdit?.subject.next(this.item);
      }
    });
  }
}
