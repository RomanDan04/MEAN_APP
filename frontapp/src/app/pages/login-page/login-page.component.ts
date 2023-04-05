import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/models/Iuser';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { FormValidationService } from 'src/app/services/form-validation.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  public formError = ""
  constructor(
    private formValitator: FormValidationService,
    private authService: AuthentificationService,
    private router: Router
  ){}

  public regForm = new FormGroup({
    login: new FormControl('',[
      Validators.required,
      Validators.minLength(5)
    ]),
    password: new FormControl('',[
      Validators.required,
    ]),
  })

  public userLogin(){
    this.formError = this.formValitator.getErrors(this.regForm)
    if(!this.formError){
      const user = <Iuser>this.regForm.value
      this.authService.authUser(user).subscribe(data => {
        const res = JSON.parse(data)
        if(!res.succes) this.formError = res.msg
        else {
          // console.log("Signed In!")
          // console.log(data)
          this.router.navigateByUrl('dashboard')
          this.authService.storeUser(res.token, res.user)
        }
      })
    }
  }
}
