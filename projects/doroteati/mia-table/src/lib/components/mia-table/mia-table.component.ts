import { SelectionModel } from '@angular/cdk/collections';
import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MiaPagination } from '@doroteati/mia-core';
import { MiaLoadingModule } from '@doroteati/mia-loading';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { TableAnimation } from '../../animations/table-animation';
import { ArrayColumnComponent } from '../../columns/array-column/array-column.component';
import { CustomColumnComponent } from '../../columns/custom-column/custom-column.component';
import { DateColumnComponent } from '../../columns/date-column/date-column.component';
import { IconToggleColumnComponent } from '../../columns/icon-toggle-column/icon-toggle-column.component';
import { ItemRelationColumnComponent } from '../../columns/item-relation-column/item-relation-column.component';
import { MoreColumnComponent } from '../../columns/more-column/more-column.component';
import { MoreOptionsColumnComponent } from '../../columns/more-options-column/more-options-column.component';
import { PhotoColumnComponent } from '../../columns/photo-column/photo-column.component';
import { SelectionColumnComponent } from '../../columns/selection-column/selection-column.component';
import { StatusColumnComponent } from '../../columns/status-column/status-column.component';
import { StringColumnComponent } from '../../columns/string-column/string-column.component';
import { TextColumnComponent } from '../../columns/text-column/text-column.component';
import { UserColumnComponent } from '../../columns/user-column/user-column.component';
import { MiaTableConfig } from '../../entities/mia-table-config';

export const MIA_TABLE_KEY_STORAGE_COLUMNS = 'mia_table.columns_';
export interface MiaTableColumnVisibility {
  key: string;
  isShow: boolean;
}

@Component({
    selector: 'mia-table',
    templateUrl: './mia-table.component.html',
    styleUrls: ['./mia-table.component.scss'],
    animations: [TableAnimation.componentAnimation],
    standalone: true,
    imports: [
        NgClass,
        MiaLoadingModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        SelectionColumnComponent,
        StringColumnComponent,
        PhotoColumnComponent,
        UserColumnComponent,
        DateColumnComponent,
        MoreColumnComponent,
        MoreOptionsColumnComponent,
        StatusColumnComponent,
        IconToggleColumnComponent,
        CustomColumnComponent,
        ItemRelationColumnComponent,
        TextColumnComponent,
        ArrayColumnComponent,
    ],
})
export class MiaTableComponent implements OnInit {
  @Input() config = new MiaTableConfig();
  @Input() mockData: MiaPagination<any> | undefined;

  @Output() isLoading = new EventEmitter<boolean>();
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() loadDataCompleted = new EventEmitter<any>();

  selection = new SelectionModel<any>(true, [], true);
  dataItems?: MiaPagination<any>;
  displayColumns: Array<String> = [];
  _isLoading = true;
  _isFirstLoad = true;

  constructor(protected storage: StorageMap) {}

  ngOnInit(): void {
    this.normalizeColumnsConfig();
    this.verifyIfSavedColumnsEdit();
    this.loadMocks();
    this.loadItems();
  }

  onClickSelect() {}

  onClickItem(item: any) {
    this.config.onClick.next({ key: 'click-row', item: item });
  }

  onClickDeleteBulk() {
    this.config.onClick.next({
      key: 'delete-bulk',
      item: this.selection.selected,
    });
    this.selection.clear();
  }

  loadWithObservable(serviceOb: Observable<MiaPagination<any>>) {
    this.setStartLoading();
    serviceOb.subscribe({
      next: (result) => {
        this.dataItems = this.normalizePagination(result);
        this.processFirstLoad();
        this.setEndLoading();
        this.loadDataCompleted.emit(this.dataItems);
      },
      error: () => {
        this.setEndLoading();
      },
    });
  }

  loadWithPromise(servicePromise: Observable<MiaPagination<any>>) {
    this.setStartLoading();
    servicePromise.subscribe({
      next: (result) => {
        this.dataItems = this.normalizePagination(result);
        this.processFirstLoad();
        this.setEndLoading();
        this.loadDataCompleted.emit(this.dataItems);
      },
      error: () => {
        this.setEndLoading();
      },
    });
  }

  loadItemsWithExtra(params: any) {
    if (this.config.service == undefined) {
      return;
    }

    this.loadWithPromise(
      this.config.service.listWithExtras(this.config.query, params)
    );
  }

  loadItems() {
    this.loadItemsWithExtra({});
  }

  onPageChange(event: PageEvent) {
    this.config.query.itemPerPage = event.pageSize;
    this.config.query.pageCurrent = event.pageIndex + 1;
    this.pageChange.emit(event);
    this.loadItems();
  }

  verifyIfSavedColumnsEdit() {
    const storageKey = MIA_TABLE_KEY_STORAGE_COLUMNS + this.config.id;
    // Verify if has ID table
    if (this.config.id == undefined || this.config.id == '') {
      this.processDisplayColumns();
      return;
    }
    // Verify if saved edit columns
    this.storage
      .get<Array<MiaTableColumnVisibility>>(
        storageKey,
        {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              key: { type: 'string' },
              isShow: { type: 'boolean' },
            },
            required: ['key', 'isShow'],
          },
        }
      )
      .subscribe({
        next: (result) => {
        if (result != undefined) {
          const visibilityMap = new Map<string, boolean>();
          result.forEach((item) => visibilityMap.set(item.key, item.isShow));

          // Current format: key-based storage to keep persistence if column order changes.
          for (const column of this.config.columns) {
            const persistedValue = visibilityMap.get(column.key);
            if (persistedValue != undefined) {
              column.isShow = persistedValue;
            }
          }
          this.processDisplayColumns();
          return;
        }

          // Legacy format: list of booleans by position.
          this.storage
          .get<Array<boolean>>(storageKey, {
            type: 'array',
            items: { type: 'boolean' },
          })
          .subscribe({
            next: (legacyResult) => {
              if (legacyResult == undefined) {
                this.processDisplayColumns();
                return;
              }

              for (
                let i = 0;
                i < legacyResult.length && i < this.config.columns.length;
                i++
              ) {
                this.config.columns[i].isShow = legacyResult[i];
              }
              this.processDisplayColumns();
            },
            error: () => {
              // Corrupted/incompatible storage payload: clear and fallback to defaults.
              this.storage.delete(storageKey).subscribe({
                next: () => this.showAllColumns(),
                error: () => this.showAllColumns(),
              });
            },
          });
        },
        error: () => {
        // Corrupted/incompatible storage payload: clear and fallback to defaults.
        this.storage.delete(storageKey).subscribe({
          next: () => this.showAllColumns(),
          error: () => this.showAllColumns(),
        });
        },
      });
  }

  showAllColumns() {
    this.config.columns.forEach((c) => {
      c.isShow = true;
    });
    this.processDisplayColumns();
  }

  normalizeColumnsConfig() {
    this.config.columns.forEach((column: any) => {
      // Backward compatibility with misspelled property "ishow".
      if (column.isShow == undefined && typeof column.ishow === 'boolean') {
        column.isShow = column.ishow;
      }
      if (column.isShow == undefined) {
        column.isShow = true;
      }
      if (column.canHide == undefined) {
        column.canHide = true;
      }
    });
  }

  processDisplayColumns() {
    this.displayColumns = new Array<String>();
    for (const column of this.config.columns) {
      if (column.isShow) {
        this.displayColumns.push(column.key);
      }
    }
  }

  loadMocks() {
    if (this.mockData) {
      this.dataItems = this.mockData;
      this.setEndLoading();
    }
  }

  processFirstLoad() {
    if (!this._isFirstLoad) {
      return;
    }

    this._isFirstLoad = false;
    if (this.dataItems!.total > 0) {
      this.config.hasEmptyScreen = false;
    }
  }

  setStartLoading() {
    this._isLoading = true;
    this.isLoading.emit(true);
  }

  setEndLoading() {
    this._isLoading = false;
    this.isLoading.emit(false);
  }

  protected normalizePagination(result: any): MiaPagination<any> {
    if (result?.data && Array.isArray(result.data)) {
      return result as MiaPagination<any>;
    }

    if (result?.response?.data && Array.isArray(result.response.data)) {
      return result.response as MiaPagination<any>;
    }

    return new MiaPagination<any>();
  }
}
