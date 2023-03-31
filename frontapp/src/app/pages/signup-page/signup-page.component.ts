import { keyframes } from '@angular/animations';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  constructor(){}

  public regForm = new FormGroup({
    name: new FormControl('',[
      Validators.required,
    ]),
    login: new FormControl('',[
      Validators.required,
      Validators.min(5)
    ]),
    email: new FormControl('',[
      Validators.required,
      Validators.pattern(/.+@.+\.\S+/g)
    ]),
    password: new FormControl('',[
      Validators.required,
    ]),
  })

  public newUser(){
    console.clear()
    if(this.regForm.valid){
      const user = this.regForm.value
      
    }else{
      const errors = Object.entries(this.regForm.controls)
      .filter(([key, ell]) => ell.errors)
      .map(([key, ell]) => key + "-> " + JSON.stringify(ell.errors))
      console.error("Form is invalid!", errors)
    }
  }
}
