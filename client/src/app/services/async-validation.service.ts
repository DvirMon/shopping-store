import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AsyncValidationService implements AsyncValidator {

  constructor(
    private authService: AuthService
  ) { }


  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    if (!control || String(control.value).length === 0) {
      return of(null)
    }

    return control.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      take(1),
      switchMap(payload => {
        return this.authService.validUniquePersonalId(payload).pipe(
          map((errors: any[]) => {
            return errors && errors.length > 0 ? ({ uniqueEmail: true }) : (null)
          })
        )
      })
    )

  }

}