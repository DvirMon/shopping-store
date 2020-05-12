import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

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
      password: ['', Validators.required, Validators.pattern(this.pattern.password), []],
    })
  }
}

