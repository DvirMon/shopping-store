import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';

import { FormService } from 'src/app/services/form.service';
import { ResetModel, ResetService } from 'src/app/services/reset.service';



@Component({
  selector: 'app-reset-auth',
  templateUrl: './reset-auth.component.html',
  styleUrls: ['./reset-auth.component.scss']
})
export class ResetAuthComponent implements OnInit {

  @ViewChild('phone') public inputPhone: NgxMatIntlTelInputComponent
  @Output() public next = new EventEmitter();

  public phoneForm: FormGroup = this.formService.resetForm()
  public serverError: string

  constructor(
    private formService: FormService,
    private resetService: ResetService
  ) { }

  ngOnInit(): void {
    this.subscribtToControl()
  }

  // SUBSCRIBTION SECTION

  private subscribtToControl() {


    this.phoneForm.valueChanges.subscribe((value: string) => {

      // console.log(this.inputPhone.value)

      // if (value.includes('@')) {
      //   this.prefix = ""
      // }
      // else if (+value && value.length >= 3) {

      //   if (value.startsWith("0")) {
      //     // this.control.setValue(value.substring(1))
      //   }

      //   this.prefix = "+972-"

      // } else {
      //   this.prefix = ""

      // }
    })
  }

  // HTTP SECTION

  public onSubmit() {
    this.resetService.getConfirmationCode(this.inputPhone.value).subscribe(
      (payload: ResetModel) => {
        this.resetService.setResetData(payload);
        this.next.emit()
      },
      (err: HttpErrorResponse) => {
        this.serverError = err.error
        this.phoneForm.controls['phone'].setErrors({ serverError: true })

      }

    )

  }

  public onChange() {

  }


}
