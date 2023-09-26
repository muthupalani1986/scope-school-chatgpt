import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'login',
  loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
},
{
  path: 'register',
  loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
},
{
  path: 'home',
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
},
{
  path: 'reset-password',
  loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)
},
{
  path: '', redirectTo: '/login', pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
