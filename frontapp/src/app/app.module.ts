import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AlertComponent } from './components/alert/alert.component';
import { FormValidationService } from './services/form-validation.service';
import { AuthentificationService } from './services/authentification.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    LoginPageComponent,
    SignupPageComponent,
    DashboardComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    FormValidationService,
    AuthentificationService,
    AuthGuardService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
