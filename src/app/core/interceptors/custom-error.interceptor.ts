import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService, private router: Router) {}

  public intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (httpRequest.method !== 'GET') return next.handle(httpRequest);
    else {
      return next.handle(httpRequest).pipe(
        catchError((err: HttpErrorResponse) => {
          console.log(err);
          this.messageService.add({
            key: 'notification',
            severity: 'error',
            summary: 'Woops! There was an error!',
          });
          return throwError(err);
        })
      );
    }
  }
}
