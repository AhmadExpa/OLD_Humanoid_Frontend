import { MainPortalComponent } from './main-portal/main-portal.component';
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './management-portal/admin-management/admin-login/admin-login.component';
import { UserLoginComponent } from './management-portal/user-management/user-login/user-login.component';
import { GuardGuard } from './shared-portal/guard/guard.guard';
import { GoogleSigninComponent } from './management-portal/google-authentication/google-signin/google-signin.component';
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
};
const routes: Routes = [
  // { path: '', component: UserLoginComponent },
  { path: 'user-login', component:UserLoginComponent },
  { path: 'login', component:AdminLoginComponent },
  { path: 'googleSignin', component:GoogleSigninComponent },
  { path: 'user-portal', loadChildren: () => import('./user-portal/user-portal.module').then(m => m.UserPortalModule) }, 
  { path: 'super-admin-portal', canActivate :[GuardGuard], loadChildren: () => import('./super-admin-portal/admin-portal.module').then(m => m.AdminPortalModule)},
  { path: 'main-portal', loadChildren: () => import('./main-portal/main-portal.module').then(m => m.MainPortalModule) },
  { path: '', loadChildren: () => import('./main-portal/main-portal.module').then(m => m.MainPortalModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
  { path: 'manager', loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
