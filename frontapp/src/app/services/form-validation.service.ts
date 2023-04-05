import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  constructor() { }
  
  public getErrors(form: FormGroup): string{
    if(form.valid) return ""

    const error = Object.entries(form.controls).filter(([key, ell]) => ell.errors)
    .map(([key, ell]) => { return {field: key, error: ell.errors}} )[0]

    return this.getMessage(error)
  }

  private getMessage(error: {
    field: string,
    error: any
  }): string{
    const errorType = Object.keys(error.error)[0]
    switch(errorType){
      case 'required':
        return "Field '" + error.field + "' is required!"
      case 'pattern':
        return "Field '"+ error.field + "' does not correspond to the set pattern!"
      case 'minlength':
        var reqLen = error.error.minlength.requiredLength
        return "Field '"+ error.field + "' contains too few characters, required length: " + reqLen + "!"
      case 'maxlength':
        var reqLen = error.error.maxlength.requiredLength
        return "Field '"+ error.field + "' contains too many characters, required length: " + reqLen + "!"
      case 'email':
        return "Field '"+ error.field + "' is not a valid email!"
      default:
        console.log(errorType)
        return "Unknow form error!"
    }
  }
}
