import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { BodyComponent } from './module/body/body.component';
import { ErrorComponent } from './module/error/error.component';
import { UnauthorizedComponent } from './module/unauthorized/unauthorized.component';

const routes: Routes = [

  // {
  //   path: '',
  //   loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
  // },

  { path: '', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },

  { path: 'error', component: ErrorComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
