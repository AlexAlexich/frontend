import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, mergeMap } from 'rxjs';
import { AuthorizationService } from '../Auth/authorization.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private authorizationService: AuthorizationService) {}

  private addTokenHeader(request: HttpRequest<any>) {
    return request.clone({
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
        Authorization: `Bearer ${this.authorizationService.token}`,
      }),
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.authorizationService.token) {
      return next.handle(req);
    }

    const httpRequest = this.addTokenHeader(req);
    return next.handle(httpRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status !== 401) {
          return throwError(() => err);
        }
        if (httpRequest.url.includes('refresh')) {
          this.authorizationService.logout();
          return throwError(() => err);
        }
        return this.authorizationService.sendRefreshToken().pipe(
          mergeMap(() => {
            let request = this.addTokenHeader(req);
            return next.handle(request);
          }),
          catchError((err) => {
            this.authorizationService.logout();
            return throwError(() => err);
          })
        );
      })
    );
  }
}
