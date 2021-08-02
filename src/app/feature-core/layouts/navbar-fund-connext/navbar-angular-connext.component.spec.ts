
import { NavbarAngularConnextComponent } from './navbar-angular-connext.component';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { DialogService } from '../../service/dialog/dialog.service';

describe('NavbarAngularConnextComponent', () => {
  let component;
  let router: Router;
  let authenticationService;
  let dialogService;
  let userIdleService;
  let modal;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    authenticationService = new AuthenticationService(null, null, null);
    dialogService = new DialogService(null);
    userIdleService = jasmine.createSpy('UserIdleService');
    modal = jasmine.createSpy('NgbModal');
    component = new NavbarAngularConnextComponent(router, authenticationService, dialogService, userIdleService, modal);
  });

  describe('side navbar toggle', () => {
    beforeEach(function () {
      spyOn(component.sidenavToggleClicked, 'emit');
    });

    it('should emit event clicked menu when user click icon side navbar', () => {
      component.sidenavToggle();
      expect(component.sidenavToggleClicked.emit).toHaveBeenCalled();
    });
  });

  it('should call dialog service to show confirm modal', async () => {
    spyOn(dialogService, 'confirm');
    await component.logout();
    expect(dialogService.confirm).toHaveBeenCalledWith('Logout', 'Are you about to Logout');
  });

  it('should logout when call logout and confirm on dialog', async () => {
    spyOn(dialogService, 'confirm').and.returnValue(true);
    spyOn(authenticationService, 'logout');
    await component.logout();
    expect(authenticationService.logout).toHaveBeenCalledTimes(1);
  });

  it('should not logout when call logout and cancel on dialog', async () => {
    spyOn(dialogService, 'confirm').and.returnValue(false);
    spyOn(authenticationService, 'logout');
    await component.logout();
    expect(authenticationService.logout).toHaveBeenCalledTimes(0);
  });

  describe('getCurrentDate', () => {
    it('should get current for show in nav bar', () => {
      let currentDate = new Date('2019-09-05');
      jasmine.clock().mockDate(currentDate);

      component.getCurrentDate();

      expect(component.currentDate).toEqual('05/09/2019');
    });
  });

  describe('homePage', () => {
    beforeEach(() => {
      spyOn(component.isHomeEmit, 'emit');
    });

    it('should go to home gabe when click home page', () => {
      component.homePage();
      expect(router.navigate).toHaveBeenCalledWith(['home']);
    });

    it('should emit home when click home page', () => {
      component.homeIndex = 0;
      component.homePage();
      expect(component.isHomeEmit.emit).toHaveBeenCalledWith('home0');
    });
  });

  describe('sidenavToggle', () => {
    beforeEach(() => {
      spyOn(component.sidenavToggleClicked, 'emit');
    });

    it('should emit toggle side navbar when click icon open or close navbar', () => {
      component.sidenavToggle();
      expect(component.sidenavToggleClicked.emit).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      spyOn(authenticationService, 'getUser').and.returnValue(mockUser());
      // spyOn(component, 'initSessionWatching');
      spyOn(component, 'getCurrentDate');
    });

    it('should get user when on load component after login', () => {
      component.ngOnInit();
      expect(component.user).toEqual(mockUser());
    });

    // it('should call initSessionWatching when on load component', () => {
    //   component.ngOnInit();
    //   expect(component.initSessionWatching).toHaveBeenCalled();
    // });

    it('should call getCurrentDate when on load component', () => {
      component.ngOnInit();
      expect(component.getCurrentDate).toHaveBeenCalled();
    });
  });

  function mockUser() {
    return {
      branchCode: '0111',
      branchName: 'ratchayothin',
      errorCode: null,
      errorMsg: null,
      expire: null,
      groupName: 'INV_Oper',
      userName: 'S12345'
    };
  }
});


