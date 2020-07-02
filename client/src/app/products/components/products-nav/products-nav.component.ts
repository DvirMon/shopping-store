import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

import { ProductsService } from 'src/app/utilities/services/products.service';

import { faCartPlus,  } from '@fortawesome/free-solid-svg-icons/faCartPlus';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-products-nav',
  templateUrl: './products-nav.component.html',
  styleUrls: ['./products-nav.component.scss']
})
export class ProductsNavComponent {

  @Input() drawerCart: MatSidenav
  @Input() drawerProduct: MatSidenav
  @Input() isAdmin: boolean
  
  public cartPlus: IconDefinition = faCartPlus

  constructor(
    private productsService: ProductsService
  ) { }

  public isMobile :Observable<boolean> = this.productsService.isMobile()



  public onDrawerCart() {
    this.drawerCart.toggle()
    this.productsService.handleDrawerToggle.next(this.drawerCart.opened)
  }
  
  public onDrawerProducts() {
    this.drawerProduct.toggle()
  }


}
