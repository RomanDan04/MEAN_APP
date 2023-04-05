import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/models/Iuser';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { FormValidationService } from 'src/app/services/form-validation.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  public formError = ""
  constructor(
    private formValitator: FormValidationService,
    private authService: AuthentificationService,
    private router: Router
  ){}

  public regForm = new FormGroup({
    name: new FormControl('',[
      Validators.required,
    ]),
    login: new FormControl('',[
      Validators.required,
      Validators.minLength(5)
    ]),
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('',[
      Validators.required,
    ]),
  })

  public newUser(){
    this.formError = this.formValitator.getErrors(this.regForm)
    if(!this.formError){
      const user = <Iuser>this.regForm.value
      this.authService.registerUser(user).subscribe(data => {
        const res = JSON.parse(data)
        if(!res.succes) this.formError = res.msg
        else this.router.navigateByUrl("login")
      })
    }
  }
}
