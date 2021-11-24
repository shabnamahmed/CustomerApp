import { NgModule , LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ImageComponentComponent } from './image-component/image-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomePageModule } from './home-page/home-page.module';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { OrdersComponent } from './home-page/orders/orders.component';
import { CurrencyPipeService } from './services/currency-pipe.service';
import localeDE from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
import { DatePipeService} from './services/date-pipe.service';

registerLocaleData(localeDE, 'de');

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignUpComponent,
    ImageComponentComponent,
    ForgotPasswordComponent,
    HomePageComponent,
    OrdersComponent,DatePipeService 
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule, 
    HttpClientModule,
    HomePageModule
  ],
  exports: [RouterModule],
  providers: [HomePageModule,CurrencyPipeService,DatePipeService,
   {provide: LOCALE_ID, useValue: 'de'}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
