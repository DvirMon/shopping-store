import { Component, OnInit, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, UntypedFormControl } from '@angular/forms';


import { MatInput } from '@angular/material/input';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    },
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {

  @ViewChild(MatInput) input: HTMLInputElement;

  @Input()  control: UntypedFormControl;

  @Input()  type: string;
  @Input()  hint: string;
  @Input()  controlName: string;
  @Input()  placeHolder: string;
  @Input()  customHint: string;

  @Input()  serverErrorMode: boolean;
  @Input()  loginHint: boolean;
  @Input()  addressHint: boolean;
  @Input()  pendingHint: boolean;

   value: any
   error: string
   serverError: string
   password: string

  onChange: (event) => void
  onTouched: () => void
  disabled: boolean

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    // this.subscribeToSubject();
    this.subscribeToControl();
  }

  // ControlValueAccessor logic

   writeValue(value: any): void {
    this.value = value ? value : ""
  }

   registerOnChange(fn: any): void {
    this.onChange = fn
  }

   registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

   setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

   handleChange(value: any) {
    this.value = value

  }

  // subscription section

  // private subscribeToSubject() {
  //   this.authService.serverError.subscribe(
  //     (error) => {
  //       this.serverError = error
  //       if (this.serverError) {
  //         this.control.setErrors({ serverError: true });
  //         this.input.focus()
  //       }
  //     }
  //   )
  // }

  private subscribeToControl() {
    this.control.statusChanges.subscribe(
      (status) => {

        if (status === "VALID") {
          this.input.focus()

        }
      })
  }


  // LOGIC SECTION

  // method to handle validation messages
   validate() {

    this.error = this.messageService.getErrorMessage(this.control, this.placeHolder)

    this.control.valueChanges.subscribe(
      () => {
        this.error = this.messageService.getErrorMessage(this.control, this.placeHolder)
      }
    )
  }

  // end of logic section
}
