import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { FormService } from 'src/app/services/form.service';

export interface PathModel {
  path: string
  icon: string
  name?: string
}

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.scss']
})
export class MenuTopComponent implements OnInit {

  @Input() isMobile: Observable<boolean>

  public isLogin: boolean


  public routes: PathModel[] = [
    { path: "/home/account", icon: "account_circle", name: "My Account" },
    { path: "/home/order/history", icon: "local_shipping", name: "My Orders" },
  ]

  public items: number

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {

    this.isLogin = this.authService.auth.isLogin
  }

  ngOnInit(): void {
  }

  public onClick(path: string): Promise<boolean> {

    if (path === "logout") {
      return this.authService.logout()
    }
    return this.router.navigateByUrl(path)

  }
}
