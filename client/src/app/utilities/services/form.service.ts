import { Injectable, ChangeDetectorRef, Inject } from '@angular/core';
import { FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { Subject, Observable, of } from 'rxjs';
import { CustomValidationService } from './custom-validation.service';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged, take, switchMap, map } from 'rxjs/operators';
import { ActionType } from '../redux/action-type';
import { store } from '../redux/store';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  public serverError = new Subject<string>()
  private cd: ChangeDetectorRef

  private regex = {
    name: /^[a-zA-Z ]{3,25}$/,
    personalId: /^[0-9]{8,9}$/,
    email: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    positive: /^[1-9]+[0-9]*$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
    creditCard: /^(?:4\d{3}|5[1-5]\d{2}||2[2-7]\d{2}|6011|2131|1800|35\d{2})([- ]?)\d{4}\1\d{4}\1\d{4}$/
  };

  constructor(
    private fb: FormBuilder,
    public http: HttpClient,
    private customValidation: CustomValidationService,
  ) { }


  public loginForm(): FormGroup {
    return this.fb.group({
      email: ['',
        [Validators.required, Validators.pattern(this.regex.email)]
      ],
      password: ['', [Validators.required, Validators.minLength(8), , Validators.maxLength(24)]],
    })
  }

  public registerForm(): FormGroup {
    return this.fb.group({
      authDetails: this.fb.group({
        personalId: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(9),
          Validators.pattern(this.regex.personalId)],
          [this.customValidation.personalIdUniqueValidation.bind(this)]
        ],
        email: ['',
          [Validators.required, Validators.pattern(this.regex.email)],
          [this.customValidation.emailUniqueAsyncValidation.bind(this)]
        ],
        password: ['', [
          Validators.required,
          Validators.pattern(this.regex.password),
          Validators.minLength(8),
          Validators.maxLength(24)]],
        confirmPassword: ['',
          [Validators.required, Validators.pattern(this.regex.password)]],
      },
        {
          validator: [this.customValidation.MustMatch('password', 'confirmPassword')],
        }),
      personalDetails: this.fb.group({
        city: ['', [Validators.required]],
        street: ['', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30)]],
        firstName: ['', [
          Validators.required,
          Validators.pattern(this.regex.name),
          Validators.minLength(3),
          Validators.maxLength(30)]],
        lastName: ['', [
          Validators.required,
          Validators.pattern(this.regex.name),
          Validators.minLength(3),
          Validators.maxLength(30)]],
      }),
    })
  }

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
        [Validators.required, Validators.pattern(this.regex.creditCard)]
      ],
    })
  }

  public productForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0.5)]],
      category: ['', [Validators.required]],
      imagePath: ['', [Validators.required]],
    })
  }


  public getErrorMessage(control: FormControl, placeHolder: string): string {

    if (control.hasError('required')) {
      return `${placeHolder} is required`
    }

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
  public setFormData(product: ProductModel) {
    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("price", product.price.toString());
    formData.append("categoryId", product.categoryId);

    if (typeof product.imagePath === "string") {
      formData.append("imagePath", product.imagePath);
    } else {
      formData.append("imagePath", product.imagePath, product.imagePath.name);
    }
    return formData
  }

  // function to handle image file
  public async previewImage(file: File): Promise<string> {

    if (!file) {
      alert("Please choose image");
      return;
    }
    const preview = await this.displayImage(file)
    return preview
  };
  // end of function

  // Display image to client:
  public displayImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        resolve(event.target.result.toString())
      }
    })
  };

  public handleStore(type: ActionType, payload?: any) {
    store.dispatch({ type, payload })
  }
}



