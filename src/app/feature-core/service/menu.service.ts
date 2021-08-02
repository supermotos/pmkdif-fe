import { Injectable } from '@angular/core';
import { MenuServiceControlApi } from 'src/app/feature-case-api/api/menu-control-api.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private menuApi: MenuServiceControlApi,
  ) { }

  getMenuCodes() {
    const menu: string[] = [];
    this.getMenuFromStorage().forEach(group => {
      group.menu.forEach(item => {
        menu.push(item.code);
        if (item.menu) {
          item.menu.forEach(menuSub => {
            menu.push(menuSub.code);
          });
        }
      });
    });
    return menu;
  }

  getMenu() {
    return this.menuApi.getMenu()
      .pipe(tap((resp) => {
        localStorage.setItem('menu', JSON.stringify(resp));
      }));
  }

  getMenuFromStorage() {
    return JSON.parse(localStorage.getItem('menu'));
  }

  removeMenuFromStorage() {
    localStorage.removeItem('menu');
  }
}
