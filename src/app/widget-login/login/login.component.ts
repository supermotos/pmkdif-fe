import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/feature-core/service/authentication.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment/moment';

@Component({
  selector: 'angular-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  error: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    this.authenticationService.removeStorage();
    this.createForm();
  }

  createForm() {
    this.signinForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'branchCode': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.login();
  }

  login() {
    // TODO: Call login api
    // After Call success will be get menu in menuService
    // this.setSessionUID();
    // this.mockGetMenu();
    // this.router.navigate(['/home']);
    this.authenticationService
      .login(this.signinForm.controls.username.value,
        this.signinForm.controls.password.value,
        this.signinForm.controls.branchCode.value,
        false)
      .subscribe(
        () => {
          this.setSessionUID();
          this.mockGetMenu();
          this.router.navigate(['/home']);
        },
        (errorRes) => {
          if (errorRes.error && errorRes.error.errorDesc) {
            this.error = errorRes.error.errorDesc;
            return;
          }
        }
      );
  }

  setSessionUID() {
    this.cookieService.set('uid', moment().format('DDMMYYYYHHmmss'));
  }

  mockGetMenu() {
    let mockMenu = [{
      'id': 10,
      'name': 'View',
      'type': 'menu',
      'menu': [{
        'id': 11,
        'name': 'Menu_1',
        'type': 'menu',
        'menu': [{
          'id': 20,
          'code': '020',
          'name': 'Menu_sub_1',
          'type': 'menu_sub'
        }]
      },
      {
        "id": 10,
        "code": "010",
        "name": "Menu_3",
        "type": "menu_sub"
      }]
    },
    {
      'id': 26,
      'name': 'Report',
      'type': 'menu',
      'menu': [{
        'id': 27,
        'name': 'Menu_1',
        'type': 'menu',
        'menu': [{
          'id': 83,
          'code': '083',
          'name': 'Menu_sub_1',
          'type': 'menu_sub'
        },
        {
          'id': 96,
          'code': '096',
          'name': 'Menu_sub_2',
          'type': 'menu_sub'
        }]
      },
      {
        'id': 28,
        'name': 'Admin',
        'type': 'menu',
        'menu': [{
          'id': 84,
          'code': '084',
          'name': 'Menu_1',
          'type': 'menu_sub'
        }]
      }]
    }];
    localStorage.setItem('menu', JSON.stringify(mockMenu));
  }

  test() {
    this.router.navigate(['/home']);
  }

}
