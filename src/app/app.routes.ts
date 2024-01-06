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
    path: 'currency-details',
    loadChildren: () =>
      import('@features/currency-details/currency-details.routes').then(
        (d) => d.Currency_Details_ROUTES
      ),
    title: 'Currency Details',
  },

  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
