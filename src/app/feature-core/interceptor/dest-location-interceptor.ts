import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EncryptionService } from '../service/encryption.service';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class DestLocationInterceptor implements HttpInterceptor {
    constructor(
        private encryptionService: EncryptionService,
        private authenticationService: AuthenticationService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const ignoreUrl = ['/api/auth/login'];
        if (!ignoreUrl.includes(request.url)) {
            request = request.clone({
                setHeaders: {
                    destLocation: this.encryptionService.encrypt(
                        this.authenticationService.getUser().userName,
                        request.url
                    )
                }
            });
        }

        return next.handle(request);
    }
}
