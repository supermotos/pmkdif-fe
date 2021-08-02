import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthControlApi } from 'src/app/feature-case-api/api/auth-control-api.service';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/feature-case-api/model/user.model';

enum Storage {
  token = 'token',
  user = 'user'
}
@Injectable()
export class AuthenticationService {

  constructor(private authControlApiService: AuthControlApi,
    private menuService: MenuService,
    private cookieService: CookieService,
  ) { }

  login(username: string, password: string, branch: string, byPass: boolean): Observable<HttpResponse<any>> {
    return this.authControlApiService.login(username, password, branch, byPass)
      .pipe(
        tap((resp) => {
          if (resp && resp.headers && resp.body) {
            const token = resp.headers.get('X-TOKEN');
            this.setToken(token);
            this.setUser(JSON.stringify(resp.body));
          }
        })
      );
  }

  logout() {
    this.authControlApiService.logout(this.getToken()).subscribe(
      () => this.removeStorage(),
      () => this.removeStorage());
  }

  isValidAuth(): boolean {
    return !!this.getToken() && !!this.cookieService.get('uid');
  }

  setToken(token: string) {
    localStorage.setItem(Storage.token, token);
  }

  getToken() {
    return localStorage.getItem(Storage.token);
  }

  setUser(user: string) {
    localStorage.setItem(Storage.user, user);
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem(Storage.user));
  }

  removeStorage() {
    const values: string[] = Object.values(Storage);
    values.forEach(value => localStorage.removeItem(value));
    this.menuService.removeMenuFromStorage();
    console.log('~call removeStorage~');
  }

}
