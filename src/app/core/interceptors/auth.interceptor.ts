import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
// import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // let authService = inject(AuthService);
  // let token = authService.token;
  // if (token) {
  //   req = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // }
  return next(req);
};
