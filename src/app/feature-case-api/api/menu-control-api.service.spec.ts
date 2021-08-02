
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { MenuServiceControlApi } from './menu-control-api.service';

describe('MenuServiceControlApi', () => {
  let menuService: MenuServiceControlApi;
  let httpClient;

  beforeEach(function () {
    httpClient = new HttpClient(null);
    menuService = new MenuServiceControlApi(httpClient);
  });

  describe('getMenu', () => {
    beforeEach(function () {
      spyOn(httpClient, 'get');
    });

    it('should send http request /api/menus', () => {
      menuService.getMenu();
      expect(httpClient.get).toHaveBeenCalledWith('/api/menus');
    });

    it('should return menuGroup data when call success', () => {
      const mockMenuGroups = [
        {
          'menu': [
            {
              'code': '001',
              'name': 'Menu_1'
            }
          ],
          'name': 'Menu_1'
        },
        {
          'menu': [
            {
              'code': '002',
              'name': 'Menu_2'
            }
          ],
          'name': 'Menu_2'
        }
      ];


      httpClient.get.and.returnValue(of(mockMenuGroups));

      menuService.getMenu().subscribe(resp => {
        expect(resp).toBe(mockMenuGroups);
      });
    });
  });

});
