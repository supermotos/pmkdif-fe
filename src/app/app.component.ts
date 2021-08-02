import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, NavigationEnd, NavigationStart, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  CUST_SUIT_BY_PASS = 'CustSuitByPass';
  title = 'frontend';
  navbarOpen: boolean;
  isLoginPageAngular: Observable<boolean>;
  isLoginPageBranch: Observable<boolean>;
  isHome: string;
  isCustSuitByPass: boolean;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.navbarOpen = false;
    this.isLoginPageAngular = this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map((a: NavigationEnd) => a.url !== '/login')
      );

    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart && e.url === '/login') {
        this.navbarOpen = null;
      }
      if (e instanceof ActivationEnd && e.snapshot.data.pageName === this.CUST_SUIT_BY_PASS) {
        this.isCustSuitByPass = e.snapshot.data.pageName === this.CUST_SUIT_BY_PASS;
        this.navbarOpen = true;
      }
    });
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
