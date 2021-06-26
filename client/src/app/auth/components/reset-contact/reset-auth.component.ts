import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  @Input() public method;

  public control: FormControl = this.formService.setMethodControl();
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


    this.control.valueChanges.subscribe(
      (value) => {
        console.log(this.control.errors)
      }
    )

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
        this.control.setErrors({ serverError: true })

      }

    )

  }

  public onChange() {

  }


}
