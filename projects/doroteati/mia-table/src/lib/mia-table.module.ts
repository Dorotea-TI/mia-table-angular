import { NgModule } from '@angular/core';

/** Angular Material */
import {
  DateAdapter,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

/** External libraries (needed for providers) */
import { MiaCoreModule } from '@doroteati/mia-core';

/** Components */
import { MiaTableComponent } from './components/mia-table/mia-table.component';
import { MiaTableEditableComponent } from './components/mia-table-editable/mia-table-editable.component';

/** Columns */
import { BaseColumnComponent } from './columns/base-column.component';
import { StringColumnComponent } from './columns/string-column/string-column.component';
import { SelectionColumnComponent } from './columns/selection-column/selection-column.component';
import { UserColumnComponent } from './columns/user-column/user-column.component';
import { DateColumnComponent } from './columns/date-column/date-column.component';
import { SelectColumnComponent } from './columns/select-column/select-column.component';
import { StatusColumnComponent } from './columns/status-column/status-column.component';
import { MoreColumnComponent } from './columns/more-column/more-column.component';
import { IconToggleColumnComponent } from './columns/icon-toggle-column/icon-toggle-column.component';
import { PhotoColumnComponent } from './columns/photo-column/photo-column.component';
import { CustomColumnComponent } from './columns/custom-column/custom-column.component';
import { MiaEditColumnsComponent } from './components/mia-edit-columns/mia-edit-columns.component';
import { ItemRelationColumnComponent } from './columns/item-relation-column/item-relation-column.component';
import { FilesizeColumnComponent } from './columns/filesize-column/filesize-column.component';
import { InputEditableColumnComponent } from './columns/input-editable-column/input-editable-column.component';
import { SelectEditableColumnComponent } from './columns/select-editable-column/select-editable-column.component';
import { RemoveEditableColumnComponent } from './columns/remove-editable-column/remove-editable-column.component';
import { DateEditableColumnComponent } from './columns/date-editable-column/date-editable-column.component';
import { CustomEditableColumnComponent } from './columns/custom-editable-column/custom-editable-column.component';
import { SelectServiceEditableColumnComponent } from './columns/select-service-editable-column/select-service-editable-column.component';
import { MoreOptionsColumnComponent } from './columns/more-options-column/more-options-column.component';
import { MiaInfiniteScrollServiceComponent } from './components/mia-infinite-scroll-service/mia-infinite-scroll-service.component';
import { TextColumnComponent } from './columns/text-column/text-column.component';
import { ArrayColumnComponent } from './columns/array-column/array-column.component';

@NgModule({
  imports: [
    // External modules (provide MIA_CORE_PROVIDER needed by MiaBaseCrudHttpService)
    MiaCoreModule,
    MatMomentDateModule,

    // Standalone components
    MiaTableComponent,
    MiaTableEditableComponent,
    MiaInfiniteScrollServiceComponent,
    BaseColumnComponent,
    StringColumnComponent,
    SelectionColumnComponent,
    UserColumnComponent,
    DateColumnComponent,
    SelectColumnComponent,
    StatusColumnComponent,
    MoreColumnComponent,
    IconToggleColumnComponent,
    PhotoColumnComponent,
    CustomColumnComponent,
    MiaEditColumnsComponent,
    ItemRelationColumnComponent,
    FilesizeColumnComponent,
    InputEditableColumnComponent,
    SelectEditableColumnComponent,
    RemoveEditableColumnComponent,
    DateEditableColumnComponent,
    CustomEditableColumnComponent,
    SelectServiceEditableColumnComponent,
    MoreOptionsColumnComponent,
    TextColumnComponent,
    ArrayColumnComponent,
  ],
  exports: [
    MatMomentDateModule,

    MiaTableComponent,
    MiaTableEditableComponent,

    MiaEditColumnsComponent,

    MiaInfiniteScrollServiceComponent,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-Us' },
    {
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: { useUtc: true, strict: true },
    },
  ],
})
export class MiaTableModule {}
