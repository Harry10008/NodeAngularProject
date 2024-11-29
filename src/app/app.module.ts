import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http'; 

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { AdminSignUPComponent } from './admin-sign-up/admin-sign-up.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthInterceptor } from './auth/interceptor.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AdminSignUPComponent,
    OrderFormComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,    
    ToastrModule.forRoot({                 // Toastr module configuration
      
      timeOut: 3000,                      // Toast duration
      positionClass: 'toast-top-right',  // Toast position
      preventDuplicates: true           // Prevent duplicate toasts
  
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,  // Use the AuthInterceptor
      multi: true                // Allows multiple interceptors to be used
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
