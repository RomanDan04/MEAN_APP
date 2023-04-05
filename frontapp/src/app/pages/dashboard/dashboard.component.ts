import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/models/Iuser';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public user: Iuser

  constructor(
    private authService: AuthentificationService,
    private router: Router,
  ){
    const data = localStorage.getItem('user')
    if(data) this.user = JSON.parse(data)
  }

  logout(){
    this.authService.logoutUser()
    this.router.navigateByUrl('login')
  }
}
