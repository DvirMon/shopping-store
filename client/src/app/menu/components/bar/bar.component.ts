import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  constructor(
    private authService : AuthService
  ) { }

  ngOnInit(): void {
  }

  public logout() {
    this.authService.logout()
  }


}
