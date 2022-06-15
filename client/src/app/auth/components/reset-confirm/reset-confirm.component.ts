import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ResetModel, ResetService } from 'src/app/auth/components/reset/reset.service';

@Component({
  selector: 'app-reset-confirm',
  templateUrl: './reset-confirm.component.html',
  styleUrls: ['./reset-confirm.component.scss']
})
export class ResetConfirmComponent implements OnInit {

  @Output() public next = new EventEmitter();

  public serverError: string

  constructor(
    private resetService: ResetService
  ) { }

  ngOnInit(): void {
  }

  // LOGIC SECTION


  // this called only if user entered full code
  public onCodeCompleted(code: string) {
    this.resetService.validConfirmationCode(code).subscribe(
      (data) => {
        this.serverError = "";
        this.next.emit()
      },
      (err: HttpErrorResponse) => {
        this.serverError = err.error
      }
    )
  }

  public onClick() {

    const { contact, method } = this.resetService.getResetData();

    this.resetService.getConfirmationCode({ contact, method  }).subscribe(
      (payload: ResetModel) => {
        this.resetService.setResetData(payload)
      },
      (err) => {
        console.log(err)
      }
    )
  }

}
