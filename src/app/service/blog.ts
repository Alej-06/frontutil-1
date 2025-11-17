import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverURL } from '../environment/environment';
import { IPage } from '../model/plist';
import { Blog } from '../model/blog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  
  constructor(private oHttp: HttpClient) {}

  getPage(page: number, rpp: number): Observable<IPage<Blog>> {
    return this.oHttp.get<IPage<Blog>>(serverURL + `/blog?page=${page}&size=${rpp}`);
  }

}
