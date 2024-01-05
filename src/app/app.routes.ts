import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('@features/home/home.routes').then((d) => d.Home_ROUTES),
    title: 'Home',
  },

  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
