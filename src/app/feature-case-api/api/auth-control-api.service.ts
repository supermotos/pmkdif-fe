import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { baseApi } from '../../feature-core/service/base-api';

@Injectable()
export class AuthControlApi {

  constructor(private http: HttpClient) { }

  login(username: string, password: string, branchCode: string, byPass: boolean): Observable<HttpResponse<any>> {
    // const localUrl = `${baseApi.auth}/login`;
    // return this.http.post<HttpResponse<any>>(localUrl, { username, password, branchCode, byPass}, { observe: 'response' });
    let user = {
      id: 1,
      username: '11111',
      firstName: 'ABC',
      lastName: 'DEF'
    }
    let body = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      token: 'fake-jwt-token'
    };

    return of(new HttpResponse({ status: 200, body: body }));
  }

  logout(token: string): Observable<HttpResponse<any>> {
    const localUrl = `${baseApi.auth}/logout`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<HttpResponse<any>>(localUrl, {}, { headers: headers });
  }
}
