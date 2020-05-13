import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActionType } from '../redux/action-type';
import { store } from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  public serverError = new Subject<string>()

  public pattern = {
    name: /^[a-zA-Z ]{3,25}$/,
    creditCard: /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
    positive: /^[1-9]+[0-9]*$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
    email: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  };

  constructor(
    private fb: FormBuilder
  ) { }


  public loginForm() {
    return this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.pattern.email)], []],
      password: ['', [Validators.required, Validators.minLength(8), , Validators.maxLength(24)], []],
    })
  }
  public registerForm() {
    return this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.pattern.email)], []],
      password: ['', [Validators.required, Validators.pattern(this.pattern.password)], []],
    })
  }

  public getErrorMessage(control: FormControl, placeHolder: string) {

    if (control.hasError('required')) {
      return `${placeHolder} is required`
    }

    if (control.hasError('min')) {
      return 'Value in not valid ';
    }

    if (placeHolder === "password" && control.hasError('maxlength') || control.hasError('minlength')) {
      return `${placeHolder} length must be 8-24 characters long`;
    }

    if (control.hasError('maxlength')) {
      return `${placeHolder} length must be less or equal to ${control.errors.maxlength.requiredLength} characters long`;
    }

    if (control.hasError('minlength')) {
      return `${placeHolder} length must be at least ${control.errors.minlength.requiredLength} characters long`;
    }

    if (control.hasError('pattern')) {
      return `invalid ${placeHolder} format`;
    }

    if (control.hasError('uniqueEmail')) {
      return 'email is not valid';

    }
  }


  public handleStore(type: ActionType, payload?: any) {
    store.dispatch({ type, payload })
  }
}



