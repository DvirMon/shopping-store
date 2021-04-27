import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormService } from 'src/app/services/form.service';

import { ResetModel, ResetService } from 'src/app/services/reset.service';



@Component({
  selector: 'app-reset-auth',
  templateUrl: './reset-auth.component.html',
  styleUrls: ['./reset-auth.component.scss']
})
export class ResetAuthComponent implements OnInit {

  @Output() public next = new EventEmitter();

  public control: FormControl = this.formService.resetForm()
  public prefix: string;
  public serverError: string

  constructor(
    private formService: FormService,
    private resetService: ResetService
  ) { }

  ngOnInit(): void {

    this.subscribtToControl()

  }

  ngAfterViewInit(): void {
  }

  // SUBSCRIBTION SECTION

  private subscribtToControl() {

    this.control.valueChanges.subscribe((value: string) => {

      if (value.includes('@')) {
        this.prefix = ""
      }
      else if (+value && value.length >= 3) {

        if (value.startsWith("0")) {
          this.control.setValue(value.substring(1))
        }

        this.prefix = "+972-"

      } else {
        this.prefix = ""

      }
    })
  }

  // HTTP SECTION

  public onSubmit() {
    console.log(this.control.value)
    this.resetService.getConfirmationCode(this.control.value).subscribe(
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



}
