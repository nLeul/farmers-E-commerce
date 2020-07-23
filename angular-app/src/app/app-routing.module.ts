import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AppComponent } from './app.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { of } from 'rxjs';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'products', loadChildren: () => import('./farmproducts/farmproducts.module').then(m => m.FarmproductsModule) },
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then(o => o.OrdersModule) }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
