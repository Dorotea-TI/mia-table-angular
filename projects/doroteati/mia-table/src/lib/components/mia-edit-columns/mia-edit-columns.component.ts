import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MiaTableConfig } from '../../entities/mia-table-config';
import {
  MiaTableColumnVisibility,
  MiaTableComponent,
  MIA_TABLE_KEY_STORAGE_COLUMNS,
} from '../mia-table/mia-table.component';

@Component({
    selector: 'mia-edit-columns',
    templateUrl: './mia-edit-columns.component.html',
    styleUrls: ['./mia-edit-columns.component.scss'],
    standalone: true,
    imports: [
        MatMenuModule,
        MatButtonModule,
        MatListModule,
        NgClass,
    ],
})
export class MiaEditColumnsComponent implements OnInit {
  @Input() config = new MiaTableConfig();
  @Input() miaTable!: MiaTableComponent;

  constructor(protected storage: StorageMap) {}

  ngOnInit(): void {}

  saveColumns() {
    const data: Array<MiaTableColumnVisibility> = [];
    for (const column of this.config.columns) {
      data.push({
        key: column.key,
        isShow: !!column.isShow,
      });
    }

    this.storage
      .set(MIA_TABLE_KEY_STORAGE_COLUMNS + this.config.id, data, {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            key: { type: 'string' },
            isShow: { type: 'boolean' },
          },
          required: ['key', 'isShow'],
        },
      })
      .subscribe();
  }

  onChange(event: MatSelectionListChange) {
    const changedColumn = event.options[0].value;
    if (changedColumn.canHide === false) {
      changedColumn.isShow = true;
    } else {
      changedColumn.isShow = event.options[0].selected;
    }

    this.miaTable.processDisplayColumns();
    this.saveColumns();
  }

  resetColumns() {
    this.config.columns.forEach((column) => {
      column.isShow = true;
    });
    this.miaTable.processDisplayColumns();
    this.saveColumns();
  }
}
