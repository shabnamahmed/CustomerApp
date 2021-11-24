import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'; 
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardComponent } from './home-page/dashboard/dashboard.component';
import { SettingsComponent } from './home-page/settings/settings.component';
import { ScanComponent } from './home-page/scan/scan.component';
import { CheckoutComponent } from './home-page/orders/checkout/checkout.component';

import { OrdersComponent } from './home-page/orders/orders.component';

const routes: Routes = [
 
  { path: 'login', component: LoginPageComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'forgotPassword',component:ForgotPasswordComponent},
  {
    path: 'homePage/:id', component: HomePageComponent,
    children: [
      { path: '', redirectTo:'dashboard',pathMatch:'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'scan', component: ScanComponent },
      { path: 'orders/checkout/:visitId/:tableId', component: CheckoutComponent } ]},
      { path: '**',component:LoginPageComponent}  
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    paramsInheritanceStrategy: 'always',
    preloadingStrategy: PreloadAllModules
  })
   ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
