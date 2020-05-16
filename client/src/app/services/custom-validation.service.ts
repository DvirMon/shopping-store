import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService implements AsyncValidator {

  constructor(
    private http : HttpClient
  ) { }
 

  public validate(control: AbstractControl): Observable<ValidationErrors | null> {

    if (!control || String(control.value).length === 0) {
      return of(null)
    }

    return control.valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged(),
      take(1),
      switchMap(payload => {
        return this.http.post("this.url" + "/register/unique-personalId", payload).pipe(
          map((errors: any[]) => {
            return errors && errors.length > 0 ? ({ uniqueEmail: true }) : (null)
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
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}
