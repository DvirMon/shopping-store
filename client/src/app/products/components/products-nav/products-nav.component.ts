import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

import { ProductsService } from 'src/app/services/products.service';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FormService } from 'src/app/services/form.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-products-nav',
  templateUrl: './products-nav.component.html',
  styleUrls: ['./products-nav.component.scss']
})
export class ProductsNavComponent {

  @Input() drawerCart: MatSidenav
  @Input() drawerProduct: MatSidenav
  @Input() isAdmin: boolean

  public isMobile :Observable<boolean> = this.productsService.isMobile()

  constructor(
    private productsService: ProductsService,
    private authService : AuthService
  ) { }


  public onDrawerCart() {
    this.drawerCart.toggle()
    this.productsService.handleDrawerToggle.next(this.drawerCart.opened)
  }

  public onDrawerProducts() {
    this.drawerProduct.toggle()
  }

  public logout() {
    this.authService.logout()
  }

}
