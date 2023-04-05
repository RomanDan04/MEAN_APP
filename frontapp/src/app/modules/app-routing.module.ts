import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { SignupPageComponent } from '../pages/signup-page/signup-page.component';
import { LoginPageComponent } from '../pages/login-page/login-page.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  {path: "", pathMatch: 'full', component: HomePageComponent},
  {path: "login", component: LoginPageComponent},
  {path: "signup", component: SignupPageComponent},
  {path: "dashboard", component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
