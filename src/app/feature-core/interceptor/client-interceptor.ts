import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';
import { ClientService } from '../service/client.service';

@Injectable({
  providedIn: 'root'
})
export class ClientInterceptor implements HttpInterceptor {
  constructor(private clientService: ClientService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.clientService.IsGetIpSuccessed()) {
      request = request.clone({
        setHeaders: {
          clientIp: this.clientService.getIpAddress(),
        }
      });
      return next.handle(request);
    }

    return from(this.clientService.getIpAddressFromSystem()).pipe(
      delay(200),
      switchMap(() => {
        request = request.clone({
          setHeaders: {
            clientIp: this.clientService.getIpAddress(),
          }
        });
        return next.handle(request);
      })
    );
  }
}

