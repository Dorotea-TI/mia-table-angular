import { Component, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { TestService } from './test.service';
import {
  MiaColumn,
  MiaTableConfig,
  MiaTableEditableComponent,
  MiaTableEditableConfig,
} from 'projects/doroteati/mia-table/src/public-api';
import { MiaPagination, MiaQuery } from '@doroteati/mia-core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  @ViewChild('tableEditable') tableEditable!: MiaTableEditableComponent;

  tableConfig: MiaTableConfig = new MiaTableConfig();

  tableEditableConfig: MiaTableEditableConfig = new MiaTableEditableConfig();
  tableDataEditable: Array<any> = [];

  mockData?: MiaPagination<any>;
  useMockData = false;

  queryScroll = new MiaQuery();
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  constructor(public testService: TestService) {}

  ngOnInit(): void {
    this.loadConfig();
    this.loadConfigEditable();

    this.queryScroll.itemPerPage = 1;
  }

  onClickSave() {
    console.log(this.tableEditable.getDataItems());
  }

  loadConfigEditable() {
    this.tableDataEditable = [
      { title: 'Titulo 1', status: 4 },
      { title: 'Titulo 2', status: 4 },
      { title: 'Titulo 3', status: 1 },
      { title: 'Titulo 4', status: 4, date: '1989-08-25' },
      { title: 'Titulo 5', status: 2 },
      { title: 'Titulo 6', status: 4 },
    ];

    this.tableEditableConfig.hasAdd = true;
    this.tableEditableConfig.columns = [
      {
        key: 'title',
        type: MiaColumn.TYPE_INPUT_EDITABLE,
        field_key: 'title',
        title: 'Title',
      },
      {
        key: 'date',
        type: MiaColumn.TYPE_DATE_EDITABLE,
        field_key: 'date',
        title: 'Date',
      },
      {
        key: 'status',
        type: MiaColumn.TYPE_SELECT_EDITABLE,
        title: 'Estado',
        field_key: 'status',
        extra: {
          options: [
            { id: 0, title: 'Estado 1', color: 'warning' },
            { id: 1, title: 'Estado 2', color: 'error' },
            { id: 2, title: 'Estado 3', color: 'violet' },
            { id: 3, title: 'Estado 4', color: 'success' },
            { id: 4, title: 'Estado 5', color: 'blue' },
            { id: 5, title: 'Estado 6', color: 'cyan' },
            { id: 6, title: 'Estado 7', color: 'pink' },
            { id: 7, title: 'Estado 8', color: '' },
          ],
        },
      },
      { key: 'remove', type: MiaColumn.TYPE_REMOVE_EDITABLE, title: '' },
    ];

    if (this.isBrowser) {
      this.tableEditableConfig.columns.splice(
        this.tableEditableConfig.columns.length - 1,
        0,
        {
          key: 'vendor',
          type: MiaColumn.TYPE_SELECT_SERVICE_EDITABLE,
          field_key: 'vendor_id',
          title: 'Vendor',
          extra: {
            service: this.testService,
            field_display: 'title',
            query: new MiaQuery(),
          },
        }
      );
    }

    this.tableEditableConfig.subject = new Subject<any>();
    this.tableEditableConfig.subject.subscribe((res) => {});
  }

  loadConfig() {
    this.tableConfig.service = this.testService;
    this.tableConfig.id = 'table-test';
    this.tableConfig.query.itemPerPage = 25;
    this.tableConfig.columns = [
      { key: 'selection', type: 'selection', title: '' },
      {
        key: 'id',
        type: 'string',
        title: 'ID',
        field_key: 'id',
      },
      {
        key: 'code',
        type: 'string',
        title: 'Codigo',
        field_key: 'code',
      },
      {
        key: 'title',
        type: 'string',
        title: 'Titulo',
        field_key: 'title',
      },
      {
        key: 'address',
        type: 'text',
        title: 'Direccion',
        field_key: 'address',
      },
      {
        key: 'city_id',
        type: 'string',
        title: 'Ciudad',
        field_key: 'city_id',
      },
      {
        key: 'current_price',
        type: 'string',
        title: 'Precio',
        field_key: 'current_price',
      },
      {
        key: 'status',
        type: 'status',
        title: 'Estado',
        field_key: 'status',
        extra: {
          options: [
            { value: 1, title: 'Activo', color: 'success' },
            { value: 6, title: 'Borrador', color: 'warning' },
            { value: 9, title: 'No Activo', color: 'error' },
            { value: 12, title: 'Pausado', color: 'violet' },
          ],
        },
      },
      {
        key: 'created_at',
        type: 'date',
        title: 'Created At',
        field_key: 'created_at',
      },
      {
        key: 'more',
        type: 'more',
        title: '',
        extra: {
          actions: [
            { icon: 'visibility', title: 'View', key: 'view' },
            { icon: 'create', title: 'Edit', key: 'edit' },
            { icon: 'delete', title: 'Delete', key: 'remove' },
          ],
        },
      },
      {
        key: 'more-option',
        type: MiaColumn.TYPE_MORE_OPTIONS,
        title: '',
        field_key: 'status',
        extra: {
          actions: {
            1: [
              { icon: 'visibility', title: 'View', key: 'view' },
              { icon: 'create', title: 'Edit', key: 'edit' },
            ],
            6: [{ icon: 'create', title: 'Edit', key: 'edit' }],
            9: [
              { icon: 'visibility', title: 'View', key: 'view' },
            ],
            12: [
              { icon: 'visibility', title: 'View', key: 'view' },
              { icon: 'create', title: 'Edit', key: 'edit' },
            ],
          },
        },
      },
    ];

    this.tableConfig.loadingColor = 'red';
    this.tableConfig.hasEmptyScreen = true;
    this.tableConfig.emptyScreenTitle =
      'No tenes cargado ningun elemento todavia';

    this.tableConfig.onClick.subscribe((result) => {
      console.log('--ACTION--');
      console.log(result.key);
    });

    if (this.useMockData) {
      this.mockData = {
        current_page: 1,
        first_page_url: '',
        from: '',
        last_page: 1,
        last_page_url: '',
        next_page_url: '',
        path: '',
        per_page: 50,
        prev_page_url: '',
        to: '',
        total: 1,
        data: [
          {
            id: 882,
            code: '350-6550',
            title: 'LOTE EN IBAGUE - CENTRO CALLE 15',
            address: 'Carrera 4 y calle 15 centro de Ibague',
            city_id: 13,
            current_price: 23000000000,
            status: 1,
            created_at: '2026-02-05T16:55:59.000000Z',
          },
        ],
      };
    } else {
      this.mockData = undefined;
    }
  }
}
