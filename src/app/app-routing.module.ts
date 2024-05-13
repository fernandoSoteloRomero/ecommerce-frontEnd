import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { loginGuard } from './auth/guards/public.guard';
import { authGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [authGuard]
  },
  {
    path: 'cibernetica',
    loadChildren: () =>
      import('./cibernetica/cibernetica.module').then(
        (m) => m.CiberneticaModule
      ),
    canActivate: [loginGuard],
  },
  { path: '404', component: Error404PageComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
