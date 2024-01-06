import { Routes } from '@angular/router';

export const Currency_Details_ROUTES: Routes = [
  {
    path: '',
    loadComponent: async () =>
      (await import('./components/layout/layout.component')).LayoutComponent,
  },
];
