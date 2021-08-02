import { AuthInterceptor } from './auth-interceptor';
import { AuthenticationService } from '../service/authentication.service';

describe('AuthInterceptor', () => {

  let service;
  let authInterceptor;
  let request;
  let next;
  beforeEach(function () {
    service = new AuthenticationService(null, null, null);
    authInterceptor = new AuthInterceptor(service);
    request = jasmine.createSpyObj('HttpRequest', ['clone']);
    next = jasmine.createSpyObj('HttpHandler', ['handle']);
  });

  describe('intercept', () => {

    beforeEach(function () {
      spyOn(service, 'getToken');
    });


    it('should set token to http headers', () => {
      const token = 'XXX';
      service.getToken.and.returnValue(token);

      authInterceptor.intercept(request, next);

      const header = {
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      };
      expect(request.clone).toHaveBeenCalledWith(header);
    });

    it('should NOT set token to http headers when token is empty', () => {
      const token = '';
      service.getToken.and.returnValue(token);

      authInterceptor.intercept(request, next);

      expect(request.clone).not.toHaveBeenCalled();
    });

    it('should NOT set token to http headers when request url is /api/auth/login', () => {
      const token = 'X';
      service.getToken.and.returnValue(token);
      request.url = '/api/auth/login';

      authInterceptor.intercept(request, next);

      expect(request.clone).not.toHaveBeenCalled();
    });

    it('should NOT set token to http headers when request url is /api/auth/logout', () => {
      const token = 'X';
      service.getToken.and.returnValue(token);
      request.url = '/api/auth/logout';

      authInterceptor.intercept(request, next);

      expect(request.clone).not.toHaveBeenCalled();
    });

  });

});

