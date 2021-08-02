import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuGroup } from '../model/menu-group.model';
import { baseApi } from '../../feature-core/service/base-api';
@Injectable()
export class MenuServiceControlApi {
  constructor(
    private http: HttpClient
  ) { }

  getMenu(): Observable<MenuGroup[]> {
    const localUrl = `${baseApi.menus}`;
    return this.http.get<MenuGroup[]>(localUrl);
  }
}
