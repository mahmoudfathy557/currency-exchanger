import { delay, finalize } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  let totalRequests = 0;
  let requestsCompleted = 0;
  const spinner = inject(NgxSpinnerService);
  totalRequests++;
  spinner.show();

  return next(req).pipe(
    delay(1000),
    finalize(() => {
      requestsCompleted++;
      if (requestsCompleted === totalRequests) {
        spinner.hide();
        totalRequests = 0;
        requestsCompleted = 0;
      }
    })
  );
};
