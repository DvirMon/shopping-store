import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormService } from 'src/app/services/form.service';
import { ActionType } from 'src/app/utilities/redux/action-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']


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
