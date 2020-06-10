import { Component, OnInit, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { FormService } from 'src/app/utilities/services/form.service';
import { AuthService } from 'src/app/utilities/services/auth.service';
// const generator = require('generate-password')

import { generate } from 'generate-password'
import { MatInput } from '@angular/material/input';


@Component({
  selector: 'app-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MyInputComponent),
      multi: true
    },
  ]
})
export class MyInputComponent implements OnInit, ControlValueAccessor {

  @ViewChild(MatInput) input: HTMLInputElement;

  @Input() public control: FormControl
  @Input() public type: string
  @Input() public hint: string
  @Input() public controlName: string
  @Input() public placeHolder: string
  @Input() public serverErrorMode: boolean

  public value: any
  public error: string
  public serverError: string
  public password: string

  onChange: (event) => void
  onTouched: () => void
  disabled: boolean

  constructor(
    private formService: FormService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.authService.serverError.subscribe(
      (error) => {
        this.serverError = error
        if (this.serverError) {
          this.control.setErrors({ serverError: true });
          this.input.focus()
        }
      }
    )
  }

  // handle default value
  public writeValue(value: any): void {
    this.value = value ? value : ""
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  public handleChange(value: any) {
    this.value = value
  }

  public generatePassword() {
    if (this.password) {
      return
    }
    this.password = generate({
      length: 24,
      numbers: true
    })
  }

  public pushPassword() {
    this.control.setValue(this.password)
  }

  public validate() {

    this.error = this.formService.getErrorMessage(this.control, this.placeHolder)
    this.control.valueChanges.subscribe(
      () => {
        this.error = this.formService.getErrorMessage(this.control, this.placeHolder)
      }
    )


  }
}
