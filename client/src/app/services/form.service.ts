import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { ProductModel } from '../utilities/models/product-model';

import { ValidationService } from './validation.service';

import { map, shareReplay } from 'rxjs/operators';
import { Subject, Observable, Subscription } from 'rxjs';

import { ActionType } from '../utilities/redux/action-type';
import { store } from '../utilities/redux/store';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  public serverError = new Subject<string>()
  public isMobile$: Observable<boolean> = this.isMobile()

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private breakpointObserver: BreakpointObserver,
    private validationService: ValidationService,

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
      name: ['', [
        Validators.required,
        Validators.pattern(this.validationService.regex.name),
        Validators.minLength(3),
        Validators.maxLength(30)]],
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

  // RESET PASSWORD FORM

  public resetForm(): FormControl {
    return this.fb.control('',
      [
        Validators.required,
        Validators.pattern(this.validationService.regex.emailPhone),
      ]

    )
  }

  // register for register form
  public newPasswordForm(): FormGroup {
    return this.fb.group({
      email: ['',
        [Validators.required, Validators.pattern(this.validationService.regex.email)],
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(24)]],
      confirmPassword: ['',
        [Validators.required,]],
    },
      {
        validator: [this.validationService.mustMatch('password', 'confirmPassword')],
      })
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

  // generic function for redux store dispatch
  public handleStore(type: ActionType, payload?: any): void {
    store.dispatch({ type, payload })
  }

  // generic function form screen size
  public isMobile(): Observable<boolean> {
    return this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }


}



