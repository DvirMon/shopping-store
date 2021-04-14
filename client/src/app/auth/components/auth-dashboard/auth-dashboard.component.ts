import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-auth-dashboard',
  templateUrl: './auth-dashboard.component.html',
  styleUrls: ['./auth-dashboard.component.scss']
})
export class AuthDashboardComponent implements OnInit {

  public login: boolean

  constructor(
    private router: Router
  ) {


    // this.subscribeToRoute()
  }

  ngOnInit(): void {

    console.log(this.login)
    console.log(this.router.url)

    if (this.router.url === "/auth/login") {
      this.login = true
    }
    console.log(this.login)
  }

  private subscribeToRoute(): void {

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(event => {
        console.log(event);
      });
  }

}
