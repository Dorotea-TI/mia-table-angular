import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { TableAnimation } from '../../animations/table-animation';
import { MiaTableConfig } from '../../entities/mia-table-config';
import { MiaPagination } from '@agencycoda/mia-core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'mia-table',
  templateUrl: './mia-table.component.html',
  styleUrls: ['./mia-table.component.scss'],
  animations: [
    TableAnimation.componentAnimation
  ]
})
export class MiaTableComponent implements OnInit {

  @Input() config = new MiaTableConfig();
  @Input() mockData: MiaPagination<any> | undefined;

  @Output() isLoading = new EventEmitter<boolean>();

  selection = new SelectionModel<any>(true, [], true);
  dataItems?: MiaPagination<any>;
  displayColumns: Array<String> = [];
  _isLoading = true;
  _isFirstLoad = true;

  constructor() { }

  ngOnInit(): void {
    this.processDisplayColumns();
    this.loadMocks();
    this.loadItems();
  }

  onClickSelect() {
    
  }

  onClickItem(item: any) {
    this.config.onClick.next({ key: 'click-row', item: item });
  }

  onClickDeleteBulk() {
    this.config.onClick.next({ key: 'delete-bulk', item: this.selection.selected });
    this.selection.clear();
  }

  loadItems() {
    if(this.config.service == undefined){
      return;
    }
    
    this.setStartLoading();
    this.config.service.list(this.config.query).then(result => {
      this.dataItems = result;
      this.processFirstLoad();
      this.setEndLoading();
    });
  }

  onPageChange(event: PageEvent) {
    console.log(event.pageSize);
    this.config.query.itemPerPage = event.pageSize;
    this.config.query.pageCurrent = event.pageIndex + 1;
    this.loadItems();
  }

  processDisplayColumns() {
    this.displayColumns = new Array<String>();
    for (const column of this.config.columns) {
      this.displayColumns.push(column.key);
    }
  }

  loadMocks() {
    if(this.mockData){
      this.dataItems = this.mockData;
      this.setEndLoading();
    }
  }

  processFirstLoad() {
    if(!this._isFirstLoad){
      return;
    }

    this._isFirstLoad = false;
    if(this.dataItems!.total > 0){
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
}
