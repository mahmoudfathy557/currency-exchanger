import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(async (error) => {
      if (error instanceof HttpErrorResponse) {
        if (error instanceof ErrorEvent) {
          // client-side error
        } else {
          // server-side error
          switch (error.status) {
            case 400: // Bad Request
              // handle blob error
              if (error.error instanceof Blob) {
                const msg = JSON.parse(await error.error.text()).message;
                alert(msg);
                break;
              }
              // handle validation error
              const validationErrors = error.error.errors;
              if (validationErrors) {
                const messages = Object.values(validationErrors).join('\n');
                alert(messages);
                break;
              }

              // handle other errors
              let message = error.error;
              console.error(message);
              alert(message);
              break;
            case 401: // Unauthorized
              alert(' 401:  Unauthorized');
              // this.router.navigate(['/login']);
              break;
            case 403: // Forbidden
              alert('403:  Forbidden');
              // this.router.navigate(['/forbidden']);
              break;
            case 404: // Not Found
              alert('404: // Not Found');
              // this.router.navigate(['/not-found']);
              // alert(`Not Found: ${error.url}`);
              console.error(`Not Found: ${error.url}`);
              break;
            case 500: // Internal Server Error
              alert('500:   Internal Server Error');
              // this.router.navigate(['/server-error']);
              break;
            default:
              alert(error.message);

              // this.router.navigate(['/error']);
              break;
          }
        }
      }

      let beError = error.error;
      // return throwError(() => `${beError?.data} [ ${error.statusText} ]`);
      return beError;
    })
  );
};
