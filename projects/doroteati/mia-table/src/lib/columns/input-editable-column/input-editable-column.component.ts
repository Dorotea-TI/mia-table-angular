import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseEditableColumnComponent } from '../base-editable-column.component';

@Component({
    selector: 'mia-input-editable-column',
    templateUrl: './input-editable-column.component.html',
    styleUrls: ['./input-editable-column.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule]
})
export class InputEditableColumnComponent extends BaseEditableColumnComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.createFormControl();
  }
}
