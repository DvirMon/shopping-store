import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { map, debounceTime, distinctUntilChanged, switchMap, take, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

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
    creditCard: /^(?:4\d{3}|5[1-5]\d{2}||2[2-7]\d{2}|6011|2131|1800|35\d{2})([- ]?)\d{4}\1\d{4}\1\d{4}\1$/
  };


  constructor( 
    public http: HttpClient,
  ) { }

  public personalIdUniqueValidation(control: AbstractControl): Observable<ValidationErrors | null> {

    if (!control || String(control.value).length === 0 || control.errors) {
      return of(null)
    }

    return control.valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged(),
      take(1), 
      switchMap(payload => {
        return this.http.post("http://localhost:4000/api/auth/unique-personalId", { personalId: payload }).pipe(
          map((error: boolean) => {
            return error ? ({ unique: true }) : (null)
          })
        )
      })
    )
  }

  public emailUniqueAsyncValidation(control: AbstractControl): Observable<ValidationErrors | null> {

    if (!control || String(control.value).length === 0 || control.errors) {
      return of(null)
    }
    return control.valueChanges.pipe(
      // startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      take(1),
      switchMap((payload: string) => {
        return this.http.post("http://localhost:4000/api/auth/unique-email", { email: payload }).pipe(
          map((error: boolean) => {
            return error ? ({ unique: true }) : (null)
          })
        )
      })
    )
  }


  public MustMatch(controlName: string, matchingControlName: string) {
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

  public requiredFileType() {
    return function (control: FormControl) {
      const file = control.value;

      if (!file) {
        return
      }

      // get file extension
      const extension = file.split('.')[1].toLowerCase();
 
      if (extension.toLowerCase() !== "png" && "jpg" && "jpeg") {
        return { requiredFileType: true }
      }

      return null
    };
  }
}
