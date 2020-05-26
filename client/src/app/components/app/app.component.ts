import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/utilities/services/auth.service';

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
