import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, FormGroup, FormControl } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged, switchMap, take, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

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
            console.log(error)
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
      startWith(''),
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
      
      const type: string = "png"
      const extension = file.split('.')[1].toLowerCase();

      if (type.toLowerCase() !== extension.toLowerCase()) {
        return { requiredFileType: true }
      }

      return null
    };
  }
}
