import { Subject } from 'rxjs';
import { MiaColumn } from './mia-column';
import { MiaBaseCrudHttpService, MiaQuery } from '@doroteati/mia-core';

export class MiaTableConfig {
  id?: string = '';
  columns: Array<MiaColumn> = [];
  service!: MiaBaseCrudHttpService<any>;
  query: MiaQuery = new MiaQuery();

  onClick: Subject<{ key: string; item: any }> = new Subject();

  loadingColor = '#000';

  hasEmptyScreen = false;
  emptyScreenImage?: string;
  emptyScreenTitle?: string;
  emptyScreenText?: string;
}
