import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

import { CategoryModel } from 'src/app/utilities/models/category-model';
import { ProductsService } from 'src/app/utilities/services/products.service';

import { faCartPlus,  } from '@fortawesome/free-solid-svg-icons/faCartPlus';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { store } from 'src/app/utilities/redux/store';

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


  public onDrawerCart() {
    this.drawerCart.toggle()
    this.productsService.handleDrawerToggle.next(this.drawerCart.opened)
  }
  
  public onDrawerProducts() {
    this.drawerProduct.toggle()
  }


}
