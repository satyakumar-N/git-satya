import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { catchError } from "rxjs/operators";
import { CommonService } from "./common.service";
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private zone: NgZone,
    private CF: CommonService
  ) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const path: any = req.url.split('/');
    const url = path[path.length - 1];
    const IgnoreUrls = ['Token'];
    const request = (IgnoreUrls.includes(url));
    if (!request) {
      const token = localStorage.getItem('Blockchain_Token');
      req = req.clone({
        setHeaders: { Authorization: 'bearer ' + token }
      });
    }
    return next.handle(req).pipe(
      catchError(err => {
        this.zone.run(() => {
          this.CF.ToastError('Session Expired', 'Error!');
          this.router.navigate(['/']);
        })
        return throwError(err);
      }));
  };
}
