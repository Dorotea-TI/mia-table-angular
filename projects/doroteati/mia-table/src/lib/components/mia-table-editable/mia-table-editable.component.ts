import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TableAnimation } from '../../animations/table-animation';
import { CustomEditableColumnComponent } from '../../columns/custom-editable-column/custom-editable-column.component';
import { DateColumnComponent } from '../../columns/date-column/date-column.component';
import { DateEditableColumnComponent } from '../../columns/date-editable-column/date-editable-column.component';
import { InputEditableColumnComponent } from '../../columns/input-editable-column/input-editable-column.component';
import { RemoveEditableColumnComponent } from '../../columns/remove-editable-column/remove-editable-column.component';
import { SelectEditableColumnComponent } from '../../columns/select-editable-column/select-editable-column.component';
import { SelectServiceEditableColumnComponent } from '../../columns/select-service-editable-column/select-service-editable-column.component';
import { StringColumnComponent } from '../../columns/string-column/string-column.component';
import { MiaTableEditableConfig } from '../../entities/mia-table-editable-config';

@Component({
    selector: 'mia-table-editable',
    templateUrl: './mia-table-editable.component.html',
    styleUrls: ['./mia-table-editable.component.scss'],
    animations: [TableAnimation.componentAnimation],
    standalone: true,
    imports: [
        MatTableModule,
        StringColumnComponent,
        DateColumnComponent,
        InputEditableColumnComponent,
        DateEditableColumnComponent,
        SelectEditableColumnComponent,
        SelectServiceEditableColumnComponent,
        RemoveEditableColumnComponent,
        CustomEditableColumnComponent,
    ],
})
export class MiaTableEditableComponent implements OnInit {
  @Input() config = new MiaTableEditableConfig();
  @Input() dataItems?: Array<any>;

  displayColumns: Array<String> = [];
  dataSource = new MatTableDataSource<any>();

  constructor() {}

  ngOnInit(): void {
    this.processDisplayColumns();
    this.processData();
  }

  onClickAdd() {
    this.dataItems?.push({});
    this.dataSource.data = this.dataItems!;
  }

  onRemove(item: any) {
    let index = this.dataItems?.indexOf(item);
    if (index != undefined && index != -1) {
      this.dataItems?.splice(index, 1);
    }
    this.processData();
  }

  getDataItems() {
    return this.dataItems;
  }

  processDisplayColumns() {
    this.displayColumns = new Array<String>();
    for (const column of this.config.columns) {
      this.displayColumns.push(column.key);
    }
  }

  processData() {
    this.dataSource.data = this.dataItems!;
  }
}
