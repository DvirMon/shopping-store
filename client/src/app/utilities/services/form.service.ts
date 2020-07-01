import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Subject, Observable } from 'rxjs';

import { ProductModel } from '../models/product-model';
import { ValidationService } from './validation.service';

import { ActionType } from '../redux/action-type';
import { store } from '../redux/store';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  public serverError = new Subject<string>()

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private http: HttpClient,
    private breakpointObserver: BreakpointObserver,
  ) { }

  //  register for login form
  public loginForm(): FormGroup {
    return this.fb.group({
      email: ['',
        [Validators.required, Validators.pattern(this.validationService.regex.email)]
      ],
      password: ['', [Validators.required, Validators.minLength(8), , Validators.maxLength(24)]],
    })
  }

  // register for register form
  public registerForm(): FormGroup {
    return this.fb.group({
      authDetails: this.fb.group({
        personalId: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(9),
          Validators.pattern(this.validationService.regex.personalId)],
          [this.validationService.personalIdUniqueValidation.bind(this)]
        ],
        email: ['',
          [Validators.required, Validators.pattern(this.validationService.regex.email)],
          [this.validationService.emailUniqueAsyncValidation.bind(this)]
        ],
        password: ['', [
          Validators.required,
          Validators.pattern(this.validationService.regex.password),
          Validators.minLength(8),
          Validators.maxLength(24)]],
        confirmPassword: ['',
          [Validators.required, Validators.pattern(this.validationService.regex.password)]],
      },
        {
          validator: [this.validationService.mustMatch('password', 'confirmPassword')],
        }),
      personalDetails: this.fb.group({
        city: ['', [Validators.required]],
        street: ['', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30)]],
        firstName: ['', [
          Validators.required,
          Validators.pattern(this.validationService.regex.name),
          Validators.minLength(3),
          Validators.maxLength(30)]],
        lastName: ['', [
          Validators.required,
          Validators.pattern(this.validationService.regex.name),
          Validators.minLength(3),
          Validators.maxLength(30)]],
      }),
    })
  }

  // register for order form
  public orderForm(): FormGroup {
    return this.fb.group({
      address: this.fb.group({
        city: ['', [Validators.required]],
        street: ['', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30)]],
      }),
      shippingDate: ['', [Validators.required]],
      creditCard: ['',
        [Validators.required, this.validationService.creditCard()]
      ],
    })
  }

  // register for product form
  public productForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      price: ['', [Validators.required, Validators.min(0.5), Validators.pattern(this.validationService.regex.positive)]],
      categoryId: ['', [Validators.required]],
      imagePath: ['', [this.validationService.requiredFileType()]],
    })
  }


  // handle input error messages
  public getErrorMessage(control: FormControl, placeHolder: string): string {

    if (placeHolder === "Password" || placeHolder === "Confirmation Password") {
      return this.passwordCustomErrorMessage(control, placeHolder)
    }

    if (control.hasError('min')) {
      return 'Value in not valid ';
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

  }

  public passwordCustomErrorMessage(control: FormControl, placeHolder: string): string {
    if (control.hasError('maxlength') || control.hasError('minlength')) {
      return `${placeHolder} length must be 8-24 characters long`;
    }

    if (control.hasError('pattern')) {
      return ` ${placeHolder} must contain at least one lowercase, uppercase and numeric character`;
    }

  }

  // set FormData object for post and put request
  public setFormData(product: ProductModel, file: File, alias: string): FormData {

    const formData = new FormData();

    formData.append("alias", alias);
    formData.append("name", product['name']);
    formData.append("price", JSON.stringify(product['price']));
    formData.append("categoryId", product['categoryId']);
    formData.append("imagePath", file, file.name);

    return formData
  }

  // display image to client:
  public previewImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        resolve(event.target.result.toString())
      }
    })
  };

  public handleStore(type: ActionType, payload?: any): void {
    store.dispatch({ type, payload })
  }

  public handleScreenSize(): Observable<boolean> {
    return this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );

  }
}



