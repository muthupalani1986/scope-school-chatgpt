import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SpinnerService } from '../../services/spinner/spinner.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(private _spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._spinnerService.show();
    return next.handle(req)
      .pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this._spinnerService.hide();
        }
      }, (error) => {
        this._spinnerService.hide();
      }));
  }
}
