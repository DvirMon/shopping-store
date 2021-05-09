import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CurrentItemModel } from 'src/app/utilities/models/cart-item-model';
import { store } from 'src/app/utilities/redux/store';

export interface PathMotel {
  path: string
  icon: string
  name?: string
}

@Component({
  selector: 'app-menu-toolbar',
  templateUrl: './menu-toolbar.component.html',
  styleUrls: ['./menu-toolbar.component.scss']
})
export class MenuToolbarComponent implements OnInit {

  @Input() isMobile: Observable<boolean>
  @Input() drawer: MatDrawer


  public routes: PathMotel[] = [
    { path: "/account", icon: "account_circle", name: "My Account" },
    { path: "/cart", icon: "shopping_cart", name: "My Cart" },
    { path: "/orders", icon: "local_shipping", name: "My Orders" },
    { path: "logout", icon: "logout", name: "Logout" },
  ]
  public mobileRoutes: PathMotel[] = [
    { path: "/home", icon: "home" },
    { path: "/home/account", icon: "account_circle" },
    { path: "/home/cart", icon: "shopping_cart" },
    { path: "/menu", icon: "menu" },
  ]

  public currentItems: CurrentItemModel[]

  private unsubscribeToStore: Function;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.subscribeToStore()
  }

  ngOnDestroy(): void {
    this.unsubscribeToStore()
  }

  private subscribeToStore(): void {
    this.unsubscribeToStore = store.subscribe(
      () => {
        this.currentItems = [...store.getState().cart.cart.getItems()];
      }
    )
    this.currentItems = [...store.getState().cart.cart.getItems()];
  }

  public onClick(path: string): Promise<boolean> {

    if (path === "logout") {
      return this.authService.logout()
    }
    return this.router.navigateByUrl(path)

  }
}
