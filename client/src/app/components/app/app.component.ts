import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DialogInterceptorService } from 'src/app/interceptors/dialog-interceptor.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  public spinner: boolean

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.autoLogin()
  }

}
