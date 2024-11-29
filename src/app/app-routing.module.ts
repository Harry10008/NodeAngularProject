import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminSignUPComponent } from './admin-sign-up/admin-sign-up.component';
import { LoggedInGuard } from './logged-in.guard';  // Import LoggedInGuard
import { LoggedOutGuard } from './logged-out.guard'; // Import LoggedOutGuard
import { OrderFormComponent } from './order-form/order-form.component';


const routes: Routes = [
  // Allow only logged-in users to access Register and Home components
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
  { path: 'save', component: RegisterComponent, canActivate: [LoggedInGuard] },

  // Allow only non-logged-in users to access Login and Signup components
  { path: '', component: LoginComponent, canActivate: [LoggedOutGuard] },
  { path: 'signup', component: AdminSignUPComponent, canActivate: [LoggedOutGuard] },
  {path:'orderForm', component:OrderFormComponent, canActivate: [LoggedInGuard]},
    
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
