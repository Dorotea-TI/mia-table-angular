import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BaseEditableColumnComponent } from '../base-editable-column.component';

@Component({
    selector: 'mia-select-editable-column',
    templateUrl: './select-editable-column.component.html',
    styleUrls: ['./select-editable-column.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule]
})
export class SelectEditableColumnComponent extends BaseEditableColumnComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.createFormControl();
  }

}
