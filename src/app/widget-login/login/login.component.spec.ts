import { LoginComponent } from './login.component';
import { AuthenticationService } from 'src/app/feature-core/service/authentication.service';
import { FormGroup } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { ExceptionService } from 'src/app/feature-core/service/exception.service';
import { MenuService } from 'src/app/feature-core/service/menu.service';
import { CookieService } from 'ngx-cookie-service';

describe('LoginComponent', () => {
  let component;
  let authApi;
  let router;
  let exceptionService;
  let menuService;
  let cookieService;
  let tempData;
  let asyncApi;

  beforeEach(function () {
    router = jasmine.createSpyObj('Router', ['navigate']);
    authApi = new AuthenticationService(null, null, null);
    exceptionService = new ExceptionService();
    menuService = new MenuService(null);
    cookieService = new CookieService(null, null);
    component = new LoginComponent(authApi, router, exceptionService);
  });

  describe('createForm', () => {
    it('should create signing form', () => {
      component.createForm();
      expect(component.signinForm instanceof FormGroup).toBe(true);
    });

    it('should init default sigin form', () => {
      component.createForm();
      expect(component.signinForm.controls.username.value).toEqual('');
      expect(component.signinForm.controls.password.value).toEqual('');
    });
  });

  describe('onSubmit', () => {
    beforeEach(function () {
      spyOn(component, 'login');
      component.createForm();
    });

    it('should call login when valid signin form', () => {
      component.signinForm.controls.username.setValue('X');
      component.signinForm.controls.password.setValue('X');
      component.signinForm.controls.branchCode.setValue('9999');

      component.onSubmit();

      expect(component.login).toHaveBeenCalled();
    });

    it('should NOT call login when invalid username', () => {
      component.signinForm.controls.username.setValue('');
      component.signinForm.controls.password.setValue('X');
      component.signinForm.controls.branchCode.setValue('');

      component.onSubmit();

      expect(component.login).not.toHaveBeenCalled();
    });

    it('should NOT call login when invalid password', () => {
      component.signinForm.controls.username.setValue('X');
      component.signinForm.controls.password.setValue('');

      component.onSubmit();

      expect(component.login).not.toHaveBeenCalled();
    });

    it('should clear error when click submmit button', () => {
      component.error = 'mock_error';
      component.onSubmit();
      expect(component.error).toEqual('');
    });

  });

  describe('login', () => {
    beforeEach(function () {
      spyOn(authApi, 'login').and.returnValue(of());
      spyOn(exceptionService, 'getDescription');
      spyOn(menuService, 'getMenu').and.returnValue(of());
      spyOn(component, 'setSessionUID');
      spyOn(component, 'clearTempMenu');
      spyOn(component, 'getAsyncCustomer');
      component.createForm();
    });

    it('should call service login with username and password', () => {
      component.signinForm.controls.username.setValue('mock_username');
      component.signinForm.controls.password.setValue('mock_password');
      component.signinForm.controls.branchCode.setValue('mock_branch');
      component.login();

      expect(authApi.login).toHaveBeenCalledWith('mock_username', 'mock_password', 'mock_branch', false);
    });

    it('should redirect to portal page when login successed and getMenu success', () => {
      menuService.getMenu.and.returnValue(of([]));
      authApi.login.and.returnValue(of({}));
      component.login();
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('should not direct to portal page when login successed and getMenu fail', () => {
      menuService.getMenu.and.returnValue(throwError([]));
      authApi.login.and.returnValue(of({}));
      component.login();
      expect(router.navigate).not.toHaveBeenCalledWith(['/home']);
    });

    it('should set menu to local storage', () => {
      authApi.login.and.returnValue(of({}));
      component.login();
      expect(menuService.getMenu).toHaveBeenCalled();
    });

    it('should NOT redirect to portal page when login failed', () => {
      authApi.login.and.returnValue(throwError({ error: { errorDesc: '' } }));
      component.login();
      expect(router.navigate).not.toHaveBeenCalledWith(['/home']);
    });

    it('should see error invalid username and password when login failed', () => {
      const errorResp = { error: { errorDesc: 'mock_error' } };
      authApi.login.and.returnValue(throwError(errorResp));

      component.login();

      expect(component.error).toBe(errorResp.error.errorDesc);
    });

    it('should see error internal server when login server error', () => {
      const errorResp = { error: 'internal_server_error' };
      const errorDesc = 'error_default_message';
      authApi.login.and.returnValue(throwError(errorResp));
      exceptionService.getDescription.and.returnValue(errorDesc);

      component.login();

      expect(component.error).toBe(errorDesc);
    });

    it('should call getDescription of exceptionService with given status code when login server error', () => {
      const errorResp = { status: 500, error: 'internal_server_error' };
      authApi.login.and.returnValue(throwError(errorResp));

      component.login();

      expect(exceptionService.getDescription).toHaveBeenCalledWith(errorResp.status);
    });

    it('should NOT call getDescription of exceptionService when does not have login server error', () => {
      const errorResp = { error: { errorDesc: 'mock_error' } };
      authApi.login.and.returnValue(throwError(errorResp));

      component.login();

      expect(exceptionService.getDescription).not.toHaveBeenCalled();
    });

    it('should be call get async cust after login success', () => {
      authApi.login.and.returnValue(of({}));

      component.login();

      expect(component.getAsyncCustomer).toHaveBeenCalled();
    });
  });

  describe('clearTempMenu', () => {
    it('should clear menu id in local storage when login', () => {
      spyOn(tempData, 'removeTempData');
      component.clearTempMenu();
      expect(tempData.removeTempData).toHaveBeenCalled();
    });
  });

  describe('getAsyncCustomer', () => {
    beforeEach(() => {
      spyOn(asyncApi, 'asyncCust').and.returnValue(of());
    });

    it('should call get asynccust after initial component', () => {
      component.getAsyncCustomer();
      expect(asyncApi.asyncCust).toHaveBeenCalled();
    });
  });

});
