import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthentificationService } from './authentification.service';
import { Observable, map } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService{
  constructor(
    private router: Router,
    private authService: AuthentificationService,
  ) { }

  canActivate(): any {
    return this.authService.isLoggedIn()
    .pipe(map(response => {
      if(!response.succes) this.router.navigateByUrl('login')
      return response.succes
    }))
  }
}
