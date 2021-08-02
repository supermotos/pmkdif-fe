import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { DialogService } from 'src/app/feature-core/service/dialog/dialog.service';
import { ExceptionService } from '../service/exception.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {

  private requestCount: number;

  constructor(
    private dialog: DialogService,
    private exceptionService: ExceptionService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private ngbModal: NgbModal
  ) {
    this.requestCount = 0;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requestCount++;
    if (this.requestCount === 1) {
      this.spinner.show();
    }
    const ingorApi = '/api/auth/login';
    const skipApi = ingorApi.includes(request.url);
    return next.handle(request).pipe(
      // delay(1000),
      catchError(error => {
        if (!skipApi) {
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            // console.error('An error occurred:', error.error.message);
            this.dialog.alert('Error ', error.error.message, 'error');
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // console.error(
            //   `Backend returned code ${error.status}, ` +
            //   `body was: ${error.error}`);
            if (error && error.error && error.error.errorDesc) {
              this.dialog.alert('', error.error.errorDesc, 'error');
            } else {
              this.dialog.alert('', this.exceptionService.getDescription(error.status), 'error').then(
                () => {
                  if ([401, 403].indexOf(error.status) !== -1) {
                    this.ngbModal.dismissAll();
                    this.router.navigate(['/login']);
                  }
                }
              );
            }
          }
        }
        return throwError(error);
      }),
      finalize(() => {
        this.requestCount--;
        if (this.requestCount === 0) {
          this.spinner.hide();
        }
      })
    );
  }

}
