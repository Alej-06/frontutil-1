import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverURL } from '../../environment/environment';
import { IRecurso } from '../../model/pavon/recurso';
import { IPage } from '../../model/plist';

@Injectable({
  providedIn: 'root',
})
export class PavonService {
  
  constructor(private oHttp: HttpClient) { }

  getPage(page: number, rpp: number, order: string = '', direction: string = ''): Observable<IPage<IRecurso>> {
    if (order === '') {
      order = 'id';
    }
    if (direction === '') {
      direction = 'asc';
    }
    return this.oHttp.get<IPage<IRecurso>>(serverURL + `/blog?page=${page}&size=${rpp}&sort=${order},${direction}`);
  }

  get(id: number): Observable<IRecurso> {
    return this.oHttp.get<IRecurso>(serverURL + '/blog/' + id);
  }

  create(blog: Partial<IRecurso>): Observable<number> {
    return this.oHttp.post<number>(serverURL + '/blog', blog);
  }

  update(blog: Partial<IRecurso>): Observable<number> {
    return this.oHttp.put<number>(serverURL + '/blog', blog);
  }

  delete(id: number): Observable<number> {
    return this.oHttp.delete<number>(serverURL + '/blog/' + id);
  }

}
