import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { SignupPageComponent } from '../pages/signup-page/signup-page.component';
import { LoginPageComponent } from '../pages/login-page/login-page.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';

const routes: Routes = [
  {path: "", pathMatch: 'full', component: HomePageComponent},
  {path: "account/dashboard", component: DashboardComponent},
  {path: "account/reg", component: SignupPageComponent},
  {path: "account/auth", component: LoginPageComponent},
  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
