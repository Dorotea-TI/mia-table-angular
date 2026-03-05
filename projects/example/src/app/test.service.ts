import { Injectable } from '@angular/core';
import {
  MiaBaseCrudHttpService,
  MiaPagination,
  MiaQuery,
} from '@doroteati/mia-core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestService extends MiaBaseCrudHttpService<any> {
  constructor() {
    super();
    this.basePathUrl = `${environment.apiUrl}/auction`;
  }

  listOb(query: MiaQuery): Observable<MiaPagination<any>> {
    const params: any = query.toParams();
    return this.postOb(this.basePathUrl + '/list', params);
  }

  list(query: MiaQuery): Observable<MiaPagination<any>> {
    return this.listOb(query);
  }
}
