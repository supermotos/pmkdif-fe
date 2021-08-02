import { MenuComponent } from './menu.component';
import { MenuService } from '../../service/menu.service';
import { MenuConfig } from '../../service/menu-config';
import { MenuGroup } from 'src/app/feature-case-api/model/menu-group.model';

describe('MenuComponent', () => {
  let component;
  let menuService;
  let menuConfig;
  let router;
  let tempService;

  beforeEach(() => {
    menuService = new MenuService(null);
    menuConfig = new MenuConfig();
    router = jasmine.createSpyObj('Router', ['navigate']);
    component = new MenuComponent(menuConfig, menuService, router);
  });

  describe('ngOnInit()', () => {
    beforeEach(() => {
      spyOn(component, 'addSearchMenu');
      spyOn(component, 'getAllMenuOrigin');
      spyOn(component, 'getRealIndex');
    });

    it('should get menu from local storage', () => {
      spyOn(menuService, 'getMenuFromStorage');
      component.ngOnInit();
      expect(menuService.getMenuFromStorage).toHaveBeenCalled();
    });

    it('should set menuConfig to menus', () => {
      spyOn(menuConfig, 'getMapMenu').and.returnValue(getMapMenuRoute());
      component.ngOnInit();
      expect(component.menus).toEqual(getMapMenuRoute());
    });

    it('should set group menu icon when after load menu', () => {
      spyOn(menuConfig, 'getMapGroupMenu').and.returnValue(getMapIconGroupMenu());
      component.ngOnInit();
      expect(component.groupMenuIcon).toEqual(getMapIconGroupMenu());
    });

    it('should add search menu when after load menu from api', () => {
      component.ngOnInit();
      expect(component.addSearchMenu).toHaveBeenCalled();
    });

    it('should save all menu origin when after load menu from api', () => {
      component.ngOnInit();
      expect(component.getAllMenuOrigin).toHaveBeenCalled();
    });

    it('should get current group menu when after click to another component', () => {
      component.ngOnInit();
      expect(component.getRealIndex).toHaveBeenCalled();
    });
  });

  describe('addSearchMenu', () => {
    it('should add search menu to first menu when initial group memu', () => {
      component.menuGroups = getMenuGroups();
      component.addSearchMenu();
      expect(component.menuGroups[0]).toEqual({
        'id': 0,
        'name': 'Search Menu'
      });
    });
  });

  describe('getAllMenuOrigin', () => {
    it('should call getAllMenu when after get all menu from api', () => {
      spyOn(component, 'getAllMenu');
      component.getAllMenuOrigin();
      expect(component.getAllMenu).toHaveBeenCalled();
    });

    it('should get all menu for search when after get all menu from api', () => {
      component.menuGroups = getMenuGroups();
      component.getAllMenuOrigin();
      expect(component.allMenuOrigin).toEqual([
        { 'id': 1, 'code': '001', 'name': 'login', 'type': 'menu_sub' },
        { 'id': 3, 'code': '003', 'name': 'home_1', 'type': 'menu_sub' },
        { 'id': 4, 'code': '004', 'name': 'home_2', 'type': 'menu_sub' }
      ]);
    });
  });

  describe('getRealIndex', () => {
    it('should get current group menu from localstorage when click to another component', () => {
      spyOn(tempService, 'getTempData').and.returnValue('1');
      component.getRealIndex();
      expect(component.realIndex).toEqual(1);
    });

    it('should not set current menu group when current page is home page', () => {
      router.url = '/home';
      component.getRealIndex();
      expect(component.realIndex).toEqual(null);
    });

    it('should not set current menu group when click home to home page', () => {
      component.isHomePage = '/home';
      component.getRealIndex();
      expect(component.realIndex).toEqual(null);
    });
  });

  describe('getMenuSearch', () => {
    it('should not found menu when key in search not have in all menu', () => {
      component.allMenuOrigin = getAllMenuOrigin();
      let keySearch = 'home_3';
      component.getMenuSearch(keySearch);
      expect(component.allMenu).toEqual([]);
    });

    it('should not found menu when not key in search menu', () => {
      component.allMenuOrigin = getAllMenuOrigin();
      let keySearch = '';
      component.getMenuSearch(keySearch);
      expect(component.allMenu).toEqual([]);
    });

    it('should found menu when key in search', () => {
      component.allMenuOrigin = getAllMenuOrigin();
      let keySearch = 'home_1';
      component.getMenuSearch(keySearch);
      expect(component.allMenu).toEqual([
        {
          'id': 3,
          'code': '003',
          'name': 'home_1',
          'type': 'menu_sub'
        }
      ]);
    });
  });

  describe('showMenu', () => {
    beforeEach(() => {
      spyOn(component, 'clearSearchMenu');
      spyOn(component, 'screenFade');
      spyOn(component, 'goToTop');
      spyOn(component, 'focusSearchInput');
    });

    it('should hide current menu and open new menu popup when click next icon menu group', () => {
      let currentIndex = 2;
      let clickNextMenuIndex = 3;
      component.isShowMenu = [];
      component.currentIndex = currentIndex;
      component.showMenu(clickNextMenuIndex);
      expect(component.isShowMenu[currentIndex]).toEqual(false);
    });

    it('should set new current index when click next icon menu group', () => {
      let currentIndex = 2;
      let clickNextMenuIndex = 3;
      component.isShowMenu = [];
      component.currentIndex = currentIndex;
      component.showMenu(clickNextMenuIndex);
      expect(component.currentIndex).toEqual(3);
    });

    it('should show next menu when click next icon menu group', () => {
      let currentIndex = 2;
      let clickNextMenuIndex = 3;
      component.isShowMenu = [];
      component.currentIndex = currentIndex;
      component.showMenu(clickNextMenuIndex);
      expect(component.isShowMenu[clickNextMenuIndex]).toEqual(true);
    });

    it('should call clearSearchMenu when click outside search menu', () => {
      component.showMenu();
      expect(component.clearSearchMenu).toHaveBeenCalled();
    });

    it('should call screenFade when click outside search menu', () => {
      component.showMenu();
      expect(component.screenFade).toHaveBeenCalled();
    });

    it('should call goToTop when click outside search menu', () => {
      component.showMenu();
      expect(component.goToTop).toHaveBeenCalled();
    });
  });

  describe('hideMenu', () => {
    beforeEach(() => {
      spyOn(component, 'clearSearchMenu');
      spyOn(component, 'screenFade');
    });

    it('should hide all menu when close side nav bar', () => {
      component.menuGroups = getMenuGroups();
      component.hideMenu();
      expect(component.isShowMenu[0]).toEqual(false);
      expect(component.isShowMenu[1]).toEqual(false);
    });

    it('should call clearSearchMenu when close side nav bar', () => {
      component.menuGroups = getMenuGroups();
      component.hideMenu();
      expect(component.clearSearchMenu).toHaveBeenCalled();
    });

    it('should call screenFade when close side nav bar', () => {
      component.hideMenu();
      expect(component.screenFade).toHaveBeenCalled();
    });
  });

  describe('onClose', () => {
    beforeEach(() => {
      spyOn(component, 'clearSearchMenu');
      spyOn(component, 'screenFade');
    });

    it('should close popup menu when click close menu popup', () => {
      let currentIndex = 2;
      component.isShowMenu = [];
      component.onClose(currentIndex);
      expect(component.isShowMenu[currentIndex]).toEqual(false);
    });

    it('should call clearSearchMenu when click close menu popup', () => {
      component.onClose();
      expect(component.clearSearchMenu).toHaveBeenCalled();
    });

    it('should call screenFade when click close menu popup', () => {
      component.onClose();
      expect(component.screenFade).toHaveBeenCalled();
    });
  });

  describe('screenFade', () => {
    it('should set isFade true when click open menu popup', () => {
      component.isShowMenu = [true, false];
      component.screenFade();
      expect(component.isFade).toEqual(true);
    });

    it('should set isFade fasle when not open menu popup', () => {
      component.isShowMenu = [false, false];
      component.screenFade();
      expect(component.isFade).toEqual(false);
    });
  });

  describe('toMenu', () => {
    beforeEach(() => {
      spyOn(component, 'hideMenu');
      spyOn(tempService, 'setTempData');
    });

    it('should go to menu when click menu sub in menu group', () => {
      component.menus = getMapMenuRoute();
      component.currentIndex = 2;
      component.toMenu('002');
      expect(router.navigate).toHaveBeenCalledWith(['mock_route_002']);
    });

    it('should call hideMenu when click go to next menu', () => {
      component.menus = getMapMenuRoute();
      component.currentIndex = 2;
      component.toMenu('002');
      expect(component.hideMenu).toHaveBeenCalled();
    });

    it('should set current group menu to localstorage when click go to menu', () => {
      component.menus = getMapMenuRoute();
      component.currentIndex = 2;
      component.toMenu('002');
      expect(tempService.setTempData).toHaveBeenCalledWith('currentMenuId', '2');
    });
  });

  describe('clearSearchMenu', () => {
    it('should clear search menu when outside search menu', () => {
      component.filterByText = jasmine.createSpyObj('FilterByText', ['clearCode']);
      component.clearSearchMenu();
      expect(component.filterByText.clearCode).toHaveBeenCalled();
    });
  });

  describe('goToTop', () => {
    it('should go to top when go to another component', () => {
      spyOn(window, 'scroll');
      component.goToTop();
      expect(window.scroll).toHaveBeenCalledWith(
        {
          top: 0,
          left: 0,
          behavior: 'smooth'
        }
      );
    });
  });

  describe('navbarOpen', () => {
    beforeEach(() => {
      spyOn(component, 'hideMenu');
    });

    it('should call hide menu when click icon for close navbar', () => {
      component.navbarOpen = true;
      expect(component.hideMenu).toHaveBeenCalled();
    });
  });

  describe('focusSearchInput', () => {
    it('should set focusElement when index is 0', () => {
      let index = 0;
      component.indexFocus = 0;
      component.focusSearchInput(index);
      expect(component.focusElement).toEqual('change0');
    });

    it('should set focusElement is null when index is not 0', () => {
      let index = 1;
      component.focusSearchInput(index);
      expect(component.focusElement).toEqual(null);
    });
  });

  function getMapMenuRoute() {
    return {
      '001': {
        'icon': 'mock_icon_001',
        'route': 'mock_route_001'
      },
      '002': {
        'icon': 'mock_icon_002',
        'route': 'mock_route_002'
      }
    };
  }

  function getMapIconGroupMenu() {
    return {
      '0': {
        'icon': 'ic-search'
      },
      '1': {
        'icon': 'ic-admin'
      }
    };
  }

  function getMenuGroups(): MenuGroup[] {
    return [
      {
        id: 1,
        name: 'login',
        type: 'menu',
        menu: [
          {
            id: 1,
            code: '001',
            name: 'login',
            type: 'menu_sub'
          }
        ]
      },
      {
        id: 2,
        name: 'home',
        type: 'menu',
        menu: [
          {
            id: 2,
            code: '002',
            name: 'home',
            menu: [
              {
                id: 3,
                code: '003',
                name: 'home_1',
                type: 'menu_sub'
              },
              {
                id: 4,
                code: '004',
                name: 'home_2',
                type: 'menu_sub'
              }
            ],
            type: 'menu_sub'
          }
        ]
      }
    ];
  }

  function getAllMenuOrigin() {
    return [
      { 'id': 1, 'code': '001', 'name': 'login', 'type': 'menu_sub' },
      { 'id': 3, 'code': '003', 'name': 'home_1', 'type': 'menu_sub' },
      { 'id': 4, 'code': '004', 'name': 'home_2', 'type': 'menu_sub' }
    ];
  }

});
