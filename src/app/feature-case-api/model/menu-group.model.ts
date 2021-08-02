import { Menu } from './menu-sub.model';

export interface MenuGroup {
  id?: number;
  menu?: Array<Menu>;
  name?: string;
  type?: string;
}
