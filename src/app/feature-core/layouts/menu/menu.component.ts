import { OnInit, Input, Component, ViewChild } from '@angular/core';
import { MenuGroup } from 'src/app/feature-case-api/model/menu-group.model';
import { MenuService } from '../../service/menu.service';
import { MenuConfig } from '../../service/menu-config';
import { menuGroupConfig } from '../../service/menu-group-config';
import { Menu } from 'src/app/feature-case-api/model/menu-sub.model';
import { Router } from '@angular/router';
import { FilterByTextComponent } from '../../component/filter-by-text/filter-by-text.component';

@Component({
  selector: 'angular-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @ViewChild('searchMenu')
  filterByText: FilterByTextComponent;

  @Input()
  get navbarOpen() { return this._navbarOpen; }
  set navbarOpen(value: boolean) {
    this._navbarOpen = value;
    this.hideMenu();
  }
  private _navbarOpen: boolean;

  @Input()
  get isHomePage() { return this._isHomePage; }
  set isHomePage(value) {
    this._isHomePage = value;
  }
  private _isHomePage: string;

  menuGroups: MenuGroup[];
  menus: any;
  menuGroupConfig = menuGroupConfig;
  groupMenuIcon: any;
  allMenu: Menu[];
  allMenuOrigin: Menu[];

  isShowMenu: boolean[] = [];
  currentIndex: number;
  realIndex: number;
  isFade: boolean;
  focusElement: string;
  indexFocus = 0;

  constructor(
    private menuConfig: MenuConfig,
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit() {
    this.menus = this.menuConfig.getMapMenu();
    this.groupMenuIcon = this.menuConfig.getMapGroupMenu();
    this.menuGroups = this.menuService.getMenuFromStorage();
    this.addSearchMenu();
    this.getAllMenuOrigin();
  }

  addSearchMenu() {
    this.menuGroups.unshift({
      id: 0,
      name: 'Search Menu'
    });
  }

  getAllMenuOrigin() {
    this.allMenuOrigin = this.getAllMenu(this.menuGroups);
  }

  getAllMenu(menuGroup: MenuGroup[]) {
    let menu = [];
    menuGroup.forEach(m => {
      if (m.id !== 0) {
        m.menu.forEach(s1 => {
          if (!s1.menu) {
            menu.push(s1);
          } else {
            s1.menu.forEach(s2 => {
              menu.push(s2);
            });
          }
        });
      }
    });
    return menu;
  }

  getMenuSearch(menu: string) {
    if (!menu) {
      this.allMenu = [];
      return;
    }
    this.allMenu = this.allMenuOrigin.filter(it => it.name.toLowerCase().includes(menu.toLowerCase()));
  }

  showMenu(index: number) {
    if (this.currentIndex !== index) {
      this.isShowMenu[this.currentIndex] = false;
    }
    this.currentIndex = index;
    this.isShowMenu[index] = !this.isShowMenu[index];
    this.clearSearchMenu();
    this.screenFade();
    this.goToTop();
    this.focusSearchInput(index);
  }

  hideMenu() {
    if (this.menuGroups) {
      this.menuGroups.forEach((e, i) => this.isShowMenu[i] = false);
      this.clearSearchMenu();
    }
    this.screenFade();
  }

  focusSearchInput(index: number) {
    this.focusElement = (index === 0) ? 'change' + this.indexFocus++ : null;
  }

  onClose(index: number) {
    this.isShowMenu[index] = false;
    this.clearSearchMenu();
    this.screenFade();
  }

  screenFade() {
    this.isFade = this.isShowMenu.some(e => e === true);
  }

  toMenu(code: string) {
    let url = this.menus[code].route;
    this.router.navigate([url]);
    this.hideMenu();
    this.realIndex = this.currentIndex;
  }

  clearSearchMenu() {
    this.filterByText.clearCode();
  }

  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
