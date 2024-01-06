import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from '@app/core/interceptors/loading.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
// import { authInterceptor } from './core/interceptors/auth.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),

    provideAnimations(),
    provideHttpClient(withInterceptors([loadingInterceptor, errorInterceptor])),
  ],
};
