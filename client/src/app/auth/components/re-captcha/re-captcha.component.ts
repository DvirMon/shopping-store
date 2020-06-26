import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/utilities/services/auth.service';

@Component({
  selector: 'app-re-captcha',
  templateUrl: './re-captcha.component.html',
})
export class ReCaptchaComponent implements OnInit {

  @Output() captcha = new EventEmitter<boolean>()

  constructor(
    private authService: AuthService

  ) { }



  ngOnInit(): void {
  }
  // handle captcha
  public resolved(captchaResponse: any): void {
    this.authService.authReCaptcha(captchaResponse).subscribe(
      (response) => this.captcha.emit(response)
    )
  }

}
