import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { map, debounceTime, distinctUntilChanged, switchMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public regex = {
    name: /^[a-zA-Z ]{3,25}$/,
    personalId: /^[0-9]{8,9}$/,
    email: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    positive: /^[1-9]+[0-9]*$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
    cc: {
      amex: /^3[47]\d{2}(\s?\d{6})(\s?\d{5})$/,
      jcb: /^(?:2131|1800|35\d{2})(\s?)\d{4}\1\d{4}\1\d{4}$/,
      masterCard: /^5[1-5]|2[2-7]\d{2}(\s?)\d{4}\1\d{4}\1\d{4}$/,
      visa: /^4\d{3}(\s?)\d{4}\1\d{4}\1\d{4}$/,
    }
  };

  constructor(
    public http: HttpClient,
  ) { }

  // validate unique id number
  public personalIdUniqueValidation(control: AbstractControl): Observable<ValidationErrors | null> {

    if (!control || String(control.value).length === 0 || control.errors) {
      return of(null)
    }

    return control.valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged(),
      take(1),
      switchMap(payload => {
        return this.http.post(`${environment.server}/api/auth/unique-personalId`, { personalId: payload }).pipe(
          map((error: boolean) => {
            return error ? ({ unique: true }) : (null)
          })
        )
      })
    )
  }

  // validate unique email address
  public emailUniqueAsyncValidation(control: AbstractControl): Observable<ValidationErrors | null> {

    if (!control || String(control.value).length === 0 || control.errors) {
      return of(null)
    }
    return control.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      take(1),
      switchMap((payload: string) => {
        return this.http.post(`${environment.server}/api/auth/unique-email`, { email: payload }).pipe(
          map((error: boolean) => {
            return error ? ({ unique: true }) : (null)
          })
        )
      })
    )
  }


  // validate password and confirm password match
  public mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      // return if another validator has already found an error on the matchingControl
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      // set error on matchingControl if validation fails
      control.value !== matchingControl.value
        ? matchingControl.setErrors({ mustMatch: true })
        : matchingControl.setErrors(null);
    }
  }

  // validate file upload format
  public requiredFileType() {
    return (control: FormControl) => {
      const file = control.value;

      if (!file) {
        return
      }

      // get file extension
      const extension = file.split('.')[1].toLowerCase();

      if (extension.toLowerCase() !== "png" && extension.toLowerCase() !== "jpg" && extension.toLowerCase() !== "jpeg") {
        return { requiredFileType: true }
      }

      return null
    };
  }

  public creditCard() {

    return (control: FormControl) => {
      
      const regex = this.regex.cc
      const cc = control.value;

      if (!cc) {
        return
      }

      if (regex.amex.test(cc) || regex.jcb.test(cc) || regex.masterCard.test(cc) || regex.visa.test(cc)) {
        return null
      }

      return { creditCard: true }
    };
  }
}
