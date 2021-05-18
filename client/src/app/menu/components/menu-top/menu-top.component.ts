import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CartModel } from 'src/app/utilities/models/cart-model';

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

  public routes: PathModel[] = [
    { path: "/home/account", icon: "account_circle", name: "My Account" },
    { path: "/home/order/history", icon: "local_shipping", name: "My Orders" },
    { path: "logout", icon: "logout", name: "Logout" },
  ]

  public items: number

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  public onClick(path: string): Promise<boolean> {

    if (path === "logout") {
      return this.authService.logout()
    }
    return this.router.navigateByUrl(path)

  }
}
