import { Routes } from '@angular/router';

export const Home_ROUTES: Routes = [
  {
    path: '',
    loadComponent: async () =>
      (await import('./components/layout/layout.component')).LayoutComponent,
  },
];
