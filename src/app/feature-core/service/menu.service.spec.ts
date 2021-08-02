import { MenuService } from './menu.service';
import { MenuServiceControlApi } from 'src/app/feature-case-api/api/menu-control-api.service';
import { of } from 'rxjs';

describe('MenuService', () => {

  let menuService;
  let menuApi;

  beforeEach(() => {
    menuApi = new MenuServiceControlApi(null);
    menuService = new MenuService(menuApi);
  });

  describe('getMenu', () => {
    beforeEach(() => {
      spyOn(menuApi, 'getMenu').and.returnValue(of(mockMenuGroups()));
      spyOn(localStorage, 'setItem');
    });

    it('should set menuGroups to localstorage', () => {
      menuService.getMenu().subscribe();
      expect(localStorage.setItem).toHaveBeenCalledWith('menu', '[' +
        '{"menuGroup":[{"code":"001","name":"Menu_1"}],"name":"Menu_1"},' +
        '{"menuGroup":[{"code":"004","name":"Menu_2"}],"name":"Menu_2"}]');
    });

  });

  describe('getMenuFromStorage', () => {
    it('should get menu from localstorage', () => {
      spyOn(localStorage, 'getItem').and.returnValue('[' +
        '{"menuGroup":[{"code":"001","name":"Menu_1"}],"name":"Menu_1"},' +
        '{"menuGroup":[{"code":"004","name":"Menu_2"}],"name":"Menu_2"}]');

      const result = menuService.getMenuFromStorage();

      expect(result).toEqual(mockMenuGroups());
    });

  });

  describe('removeMenuFromStorage', () => {
    it('should remove menu item in localstorage', () => {
      spyOn(localStorage, 'removeItem').and.returnValue(of());
      menuService.removeMenuFromStorage();

      expect(localStorage.removeItem).toHaveBeenCalledWith('menu');
    });
  });

  function mockMenuGroups() {
    return [
      {
        'menuGroup': [
          {
            'code': '001',
            'name': 'Menu_1'
          }
        ],
        'name': 'Menu_1'
      },
      {
        'menuGroup': [
          {
            'code': '002',
            'name': 'Menu_2'
          }
        ],
        'name': 'Menu_2'
      }
    ];
  }

});
